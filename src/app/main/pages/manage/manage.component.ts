import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from 'app/core/core.service';

import Editor from 'assets/ckeditor';
import { ValidationService } from 'app/shared/validation.service';
import { PagesService } from '../pages.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  public Editor = Editor;
  pagesForm: FormGroup;
  status: Array<object>;
  isRedirectToList: string;
  public config: any;

  isEdit: boolean;
  pageDetails: any;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private coreService: CoreService,
    private pageService: PagesService
  ) {
    this.config = this.coreService.ckEditorConfig;
  }

  ngOnInit() {
    this.isEdit = false;
    this.pageDetails = {};
    this.pagesForm = this.fb.group({
      pageTitle: ['', ValidationService.required],
      pageContent: ['', ValidationService.required]
    });
    this.route.data.subscribe((data: any) => {
      if (data && data.detail) {
        this.pageDetails = data.detail;
        this.isEdit = true;
        this.pagesForm.patchValue(this.pageDetails);
      }
    });
  }

  onSubmit(e: any): void {
    if (this.pagesForm.valid) {
      this.pagesForm.value['pageId'] = this.pageDetails.pageId;
      this.pageService.updatePage(this.pagesForm.value).subscribe(
        (res: any) => {
          if (res && res.status) {
            res.message = 'Page updated successfully.';
            this.coreService.showSnackbar(res.message);
            this.coreService.navigateTo('/pages');
          } else {
            this.coreService.showSnackbar(res.message, '', 'fail');
          }
        },
        (error: any) => {
          this.coreService.showSnackbar(error.error.message, '', 'fail');
        }
      );
    }
  }

  controlFlow(e: any): void {
    this.isRedirectToList = e.value;
  }
}
