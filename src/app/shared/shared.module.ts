import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTableModule,
  MatMenuModule,
  MatRippleModule,
  MatSelectModule,
  MatListModule,
  MatTabsModule,
  MatDividerModule,
  MatTooltipModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatProgressBarModule,
  MatSlideToggleModule,
  MatGridListModule,
  MatRadioModule,
  MatButtonToggleModule,
  MatDialogModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule, FuseSidebarModule } from '@fuse/components';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ProgressiveImageLoaderDirective } from './directives/progressiveImageLoader.directive';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { NumberOnlyDirective } from './directives/number-only.directive';
import { DataDetailDialogComponent } from './data-detail-dialog/data-detail-dialog.component';
import { EqualValidator } from '../auth/reset-password/equal-validator.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    MatButtonModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatToolbarModule,
    MatSelectModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatDialogModule,

    FuseSharedModule,
    FuseSidebarModule,
    FuseWidgetModule,

    NgxDatatableModule,

    CKEditorModule
  ],
  exports: [
    ProgressiveImageLoaderDirective,
    NumberOnlyDirective,

    CommonModule,

    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatSidenavModule,
    MatTableModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatListModule,
    MatTabsModule,
    MatTooltipModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatDialogModule,

    FuseSharedModule,
    FuseWidgetModule,

    NgxDatatableModule,

    CKEditorModule
  ],
  declarations: [
    ProgressiveImageLoaderDirective,
    ConfirmDialogComponent,
    NumberOnlyDirective,
    DataDetailDialogComponent
  ],
  entryComponents: [ConfirmDialogComponent, DataDetailDialogComponent]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
