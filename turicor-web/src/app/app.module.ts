import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HeaderComponent} from "./header/header.component";
import { LoginComponent } from './login/login.component';
import {AppRoutingModule} from "./app-routing.module";
import {AppService} from "./service/app.service";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import { CalendarModule } from 'primeng/primeng';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    CalendarModule,
    BrowserAnimationsModule
  ],
  providers: [
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
