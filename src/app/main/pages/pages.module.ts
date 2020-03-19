import { NgModule } from '@angular/core';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { ManageComponent } from './manage/manage.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    declarations: [PagesComponent, ManageComponent],
    imports: [SharedModule, PagesRoutingModule]
})
export class PagesModule {}
