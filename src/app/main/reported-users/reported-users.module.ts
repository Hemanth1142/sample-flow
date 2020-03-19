import { NgModule } from '@angular/core';

import { ReportedUsersRoutingModule } from './reported-users-routing.module';
import { ReportedUsersComponent } from './reported-users.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [ReportedUsersComponent],
  imports: [SharedModule, ReportedUsersRoutingModule]
})
export class ReportedUsersModule {}
