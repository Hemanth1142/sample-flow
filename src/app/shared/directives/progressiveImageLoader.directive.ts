import {
  AfterContentInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  Renderer2,
  OnChanges
} from '@angular/core';

@Directive({
  selector: 'img[default]'
})
export class ProgressiveImageLoaderDirective
  implements AfterContentInit, OnDestroy, OnChanges {
  private nativeElement: HTMLElement;
  private cancelOnError: Function;
  private cancelOnLoad: Function;
  private largeImage;
  private loaderImage = 'assets/images/loaders/loading.gif';

  @Input() default: string;
  @Input() src: string;

  @Output() emitOnError: EventEmitter<any> = new EventEmitter();

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterContentInit() {
    this.registerEvents();
  }

  registerEvents() {
    this.nativeElement = this.el.nativeElement;
    this.onError = this.onError.bind(this);
    this.onLoad = this.onLoad.bind(this);

    this.renderer.setAttribute(this.nativeElement, 'src', this.loaderImage);

    this.cancelOnError = this.renderer.listen(
      this.nativeElement,
      'error',
      this.onError
    );
    this.cancelOnLoad = this.renderer.listen(
      this.nativeElement,
      'load',
      this.onLoad
    );
  }

  private onError() {
    if (this.nativeElement.getAttribute('src') !== this.default) {
      this.renderer.setAttribute(this.nativeElement, 'src', this.default);
    } else {
      this.removeOnLoadEvent();
    }
  }

  private onLoad() {
    this.removeOnLoadEvent();
    this.largeImage = new Image();
    if (
      this.src == undefined ||
      this.src == '' ||
      this.src === 'assets/images/loaders/loading.gif'
    ) {
      this.largeImage.src = this.default;
    } else {
      this.largeImage.src = this.src;
    }
    this.largeImage.onload = () => {
      this.renderer.setAttribute(
        this.nativeElement,
        'src',
        this.largeImage.src
      );
    };
  }

  private removeErrorEvent() {
    if (this.cancelOnError) {
      this.cancelOnError();
    }
  }

  private removeOnLoadEvent() {
    if (this.cancelOnLoad) {
      this.cancelOnLoad();
    }
  }

  ngOnDestroy() {
    this.removeErrorEvent();
    this.removeOnLoadEvent();
  }

  ngOnChanges() {
    this.onLoad();
  }
}
