import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { ManageComponent } from './manage/manage.component';
import { AppDataResolver } from 'app/core/app.data.resolver';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    pathMatch: 'full'
  },
  {
    path: ':id',
    component: ManageComponent,
    data: { detailApi: 'CMSPage/Get/', redirectTo: '/pages' },
    resolve: {
      detail: AppDataResolver
    },
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
