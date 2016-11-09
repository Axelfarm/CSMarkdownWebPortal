import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './../Components/app.component';
import { ReportComponent } from './../Components/report.component';
import { ParametersComponent } from './../Components/parameters.component';
import { ReportsComponent } from './../Components/reports.component';

@NgModule({
    imports: [BrowserModule, HttpModule],
    declarations: [AppComponent, ReportComponent, ReportsComponent, ParametersComponent],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
