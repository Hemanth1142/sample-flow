import { NgModule } from '@angular/core';

import { ReportedVideosRoutingModule } from './reported-videos-routing.module';
import { ReportedVideosComponent } from './reported-videos.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [ReportedVideosComponent],
  imports: [SharedModule, ReportedVideosRoutingModule]
})
export class ReportedVideosModule {}
