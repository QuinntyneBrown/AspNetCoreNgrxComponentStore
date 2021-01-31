import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToDosModule } from './to-dos/to-dos.module';
import { baseUrl } from '@core/constants';
import { SharedModule } from '@shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ToDosModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: baseUrl, useValue: "https://localhost:5001/" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
