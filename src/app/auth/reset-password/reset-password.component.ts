import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from 'app/core/core.service';
import { HttpClient } from '@angular/common/http';
import md5 from 'md5';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  codeValid: boolean;
  isSubmitted: boolean;
  resetSuccess: boolean;
  PasswordVarificationCode: string;
  error: boolean;

  constructor(
    private _fuseConfigService: FuseConfigService,
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private coreService: CoreService,
    private http: HttpClient
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

  ngOnInit(): void {
    this.codeValid = false;
    this.isSubmitted = false;
    this.resetSuccess = false;
    this.PasswordVarificationCode = '';
    this.error = false;
    this.route.data.subscribe(
      (data: any) => {
        if (data && data.verification) {
          this.codeValid = data.verification.res.status;
          this.PasswordVarificationCode = data.verification.code;
        }
      },
      (err: any) => {
        this.coreService.showSnackbar('Something went wrong', '', 'fail');
      }
    );
    this.resetPasswordForm = this._formBuilder.group({
      password: ['', Validators.required],
      passwordConfirm: ['', [Validators.required]]
    });
  }

  resetPassword() {
    if (this.resetPasswordForm.valid) {
      const clones = {
        PasswordVarificationCode: this.PasswordVarificationCode,
        NewPassword: md5(this.resetPasswordForm.value.password),
        ConfirmPassword: md5(this.resetPasswordForm.value.passwordConfirm)
      };

      this.isSubmitted = true;
      this.http.post('Account/UserResetPassword', clones).subscribe(
        (res: any) => {
          if (res && res.status) {
            this.resetSuccess = true;
          } else {
            this.isSubmitted = false;
            this.resetSuccess = false;
            this.error = true;
          }
        },
        error => {
          this.resetSuccess = false;
          this.error = true;
        }
      );
    }
  }
}
