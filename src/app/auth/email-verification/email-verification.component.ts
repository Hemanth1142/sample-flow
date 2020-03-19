import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfigService } from '@fuse/services/config.service';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from 'app/core/core.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class EmailVerificationComponent implements OnInit {
  valid: boolean;
  constructor(
    private _fuseConfigService: FuseConfigService,
    private route: ActivatedRoute,
    private coreService: CoreService
  ) {
    // Configure the layout
    this._fuseConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        toolbar: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        sidepanel: {
          hidden: true
        }
      }
    };
  }

  ngOnInit() {
    this.valid = false;
    this.route.data.subscribe(
      (data: any) => {
        if (data && data.verification) {
          this.valid = data.verification.res.status;
        }
      },
      (err: any) => {
        this.coreService.showSnackbar('Something went wrong', '', 'fail');
      }
    );
  }
}
