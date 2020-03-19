import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./main/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    pathMatch: 'full',
    redirectTo: '/'
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'reset-password',
    loadChildren: () =>
      import('./auth/reset-password/reset-password.module').then(
        m => m.ResetPasswordModule
      )
  },
  {
    path: 'verification',
    loadChildren: () =>
      import('./auth/email-verification/email-verification.module').then(
        m => m.EmailVerficationModule
      )
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./main/user/user.module').then(m => m.UserModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'category',
    loadChildren: () =>
      import('./main/category/category.module').then(m => m.CategoryModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'pages',
    loadChildren: () =>
      import('./main/pages/pages.module').then(m => m.PagesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'reported-videos',
    loadChildren: () =>
      import('./main/reported-videos/reported-videos.module').then(
        m => m.ReportedVideosModule
      ),
    canActivate: [AuthGuard]
  },
  {
    path: 'reported-users',
    loadChildren: () =>
      import('./main/reported-users/reported-users.module').then(
        m => m.ReportedUsersModule
      ),
    canActivate: [AuthGuard]
  },

  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
