import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { MatSnackBarModule } from '@angular/material';

import { CoreService } from './core.service';
import { AuthHttpInterceptor } from './app-http-interceptor';
import { AppDataResolver } from './app.data.resolver';

@NgModule({
  imports: [CommonModule, HttpClientModule, MatSnackBarModule],
  declarations: []
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        CoreService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthHttpInterceptor,
          multi: true
        },
        AppDataResolver
      ]
    };
  }
}
