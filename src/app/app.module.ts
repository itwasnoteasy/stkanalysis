import { AlphavantageService } from './service/alphavantage.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CciComponent } from './components/cci/cci.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    CciComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [AlphavantageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
