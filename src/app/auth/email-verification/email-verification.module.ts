import { NgModule } from '@angular/core';

import { EmailVerificationRoutingModule } from './email-verification-routing.module';
import { EmailVerificationComponent } from './email-verification.component';
import { FuseSharedModule } from '@fuse/shared.module';

@NgModule({
  declarations: [EmailVerificationComponent],
  imports: [FuseSharedModule, EmailVerificationRoutingModule]
})
export class EmailVerficationModule {}
