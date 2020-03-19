import { NgModule } from '@angular/core';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ManageComponent } from './manage/manage.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    declarations: [UserComponent, ManageComponent],
    imports: [SharedModule, UserRoutingModule]
})
export class UserModule {}
