import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportedVideosComponent } from './reported-videos.component';

const routes: Routes = [
  {
    path: '',
    component: ReportedVideosComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportedVideosRoutingModule {}
