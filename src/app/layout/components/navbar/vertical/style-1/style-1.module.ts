import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { FuseNavigationModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';

import { NavbarVerticalStyle1Component } from 'app/layout/components/navbar/vertical/style-1/style-1.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [NavbarVerticalStyle1Component],
  imports: [
    SharedModule,
    MatButtonModule,
    MatIconModule,

    FuseSharedModule,
    FuseNavigationModule
  ],
  exports: [NavbarVerticalStyle1Component]
})
export class NavbarVerticalStyle1Module {}
