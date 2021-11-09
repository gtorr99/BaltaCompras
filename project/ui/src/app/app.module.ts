import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import { CoreModule } from "@core/core.module";
import { SharedModule } from '@shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [ AppComponent ],
  imports: [
    AppRoutingModule,
    SharedModule,
    BrowserModule,
    CoreModule,
    ReactiveFormsModule,
    NgbModule,
    NgbModalModule,
    NgSelectModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));