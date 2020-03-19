import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { LoginService } from './login.service';
import { CoreService } from 'app/core/core.service';
import { UserService } from '../user.service';
import { ValidationService } from 'app/shared/validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  /**
   * Constructor
   *
   * @param {FuseConfigService} _fuseConfigService
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    private _fuseConfigService: FuseConfigService,
    private _formBuilder: FormBuilder,
    private loginService: LoginService,
    private coreService: CoreService,
    private userService: UserService
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

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: [
        '',
        [ValidationService.required, ValidationService.emailValidator]
      ],
      password: ['', ValidationService.required]
    });
  }

  login(): boolean {
    const token = null;
    if (this.loginForm.valid) {
      this.loginService
        .login({
          UserName: this.loginForm.value.email,
          Password: this.loginForm.value.password
        })
        .subscribe(
          (res: any) => {
            console.log(res);
            if (res && res.status) {
              if (res.data && res.data.access_token) {
                this.userService.storeUserInfo(res.data);
                // token = this.jwtHelper.decodeToken(
                //     res.data.token
                // );
                // this.coreService.store('token', res.data.token);
                this.coreService.navigateTo('/dashboard');
              } else if (
                token.status === 'Pending' &&
                token.resetVerificationCode
              ) {
                this.coreService.navigateTo(
                  '/set-password/' +
                    token.resetVerificationCode +
                    '/' +
                    token.id
                );
              }
              return true;
            } else {
              this.coreService.showSnackbar(res.message, '', 'fail');
              return false;
            }
          },
          err => {
            this.coreService.showSnackbar(err.error.message, '', 'fail');
            return false;
          }
        );
    }
    return false;
  }
}
