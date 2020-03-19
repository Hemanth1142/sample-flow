import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from './auth.service';
import { UserService } from './user.service';

import { AuthGuard } from './auth.guard';

@NgModule({
  imports: [CommonModule],
  providers: [
    AuthService,
    UserService,
    AuthGuard
  ]
})
export class AuthModule { }
