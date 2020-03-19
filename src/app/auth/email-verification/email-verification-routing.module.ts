import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailVerificationComponent } from './email-verification.component';
import { VerificationResolver } from '../verification.resolver';

const routes: Routes = [
  {
    path: ':code',
    component: EmailVerificationComponent,
    pathMatch: 'full',
    data: { detailApi: 'Account/UserActivation/' },
    resolve: { verification: VerificationResolver }
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [VerificationResolver]
})
export class EmailVerificationRoutingModule {}
