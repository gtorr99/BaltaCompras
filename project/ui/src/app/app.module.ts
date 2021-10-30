import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import { CoreModule } from "@core/core.module";
import { SharedModule } from '@shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    AppRoutingModule,
    SharedModule,
    BrowserModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbModalModule,
    BrowserAnimationsModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    // AutocompleteLibModule,
    HttpClientModule, 
    // HttpClient
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [SharedModule]//, AutocompleteLibModule]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));