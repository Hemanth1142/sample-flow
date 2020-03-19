import { NgModule } from '@angular/core';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { ManageComponent } from './manage/manage.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    declarations: [CategoryComponent, ManageComponent],
    imports: [SharedModule, CategoryRoutingModule]
})
export class CategoryModule {}
