import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastrModule } from 'ngx-toastr';
import { httpInterceptorProviders } from './interceptors';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      newestOnTop: true,
      autoDismiss: true,
      closeButton: true,
      progressBar: true,
      maxOpened: 5
    })
  ],
  providers: [
    httpInterceptorProviders
  ],
})
export class CoreModule { }
