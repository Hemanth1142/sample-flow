import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category.component';
import { ManageComponent } from './manage/manage.component';
import { AppDataResolver } from 'app/core/app.data.resolver';

const routes: Routes = [
  {
    path: '',
    component: CategoryComponent,
    pathMatch: 'full'
  },
  {
    path: 'create',
    component: ManageComponent,
    pathMatch: 'full'
  },
  {
    path: ':id',
    component: ManageComponent,
    pathMatch: 'full',
    data: { detailApi: 'Category/get/', redirectTo: '/category' },
    resolve: {
      detail: AppDataResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule {}
