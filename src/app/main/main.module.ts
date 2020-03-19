import { NgModule } from '@angular/core';

import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    declarations: [],
    imports: [SharedModule, MainRoutingModule]
})
export class MainModule {}
