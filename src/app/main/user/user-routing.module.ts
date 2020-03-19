import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { ManageComponent } from './manage/manage.component';
import { AppDataResolver } from 'app/core/app.data.resolver';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    pathMatch: 'full'
  },
  {
    path: ':id',
    component: ManageComponent,
    pathMatch: 'full',
    data: { detailApi: 'User/get/', redirectTo: '/user' },
    resolve: {
      detail: AppDataResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
