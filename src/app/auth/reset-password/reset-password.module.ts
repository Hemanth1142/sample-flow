import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { FuseSharedModule } from '@fuse/shared.module';
import { ResetPasswordComponent } from './reset-password.component';
import { SharedModule } from 'app/shared/shared.module';
import { VerificationResolver } from '../verification.resolver';
import { EqualValidator } from './equal-validator.directive';

const routes = [
  {
    path: ':code',
    component: ResetPasswordComponent,
    pathMatch: 'full',
    data: { detailApi: 'Account/UserPasswordVarificationCode/' },
    resolve: { verification: VerificationResolver }
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login'
  }
];

@NgModule({
  declarations: [ResetPasswordComponent, EqualValidator],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),

    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,

    FuseSharedModule
  ],
  providers: [VerificationResolver]
})
export class ResetPasswordModule {}
