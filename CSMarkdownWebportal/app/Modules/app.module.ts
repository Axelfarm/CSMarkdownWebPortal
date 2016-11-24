//Core
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

//Shared components
import { AppComponent } from './../Components/app.component';
import { ReportComponent } from './../Components/report.component';
import { ParametersComponent } from './../Components/parameters.component';
import { ReportsComponent } from './../Components/reports.component';
import { TreeModule } from 'angular2-tree-component';

//Shared pipes
import { TestPipe } from './../Pipes/test.pipe';

//Shared services
import { ReportService } from './../Services/report.service';


@NgModule({
    imports: [BrowserModule, HttpModule, TreeModule],
    declarations: [AppComponent, ReportComponent, ReportsComponent, ParametersComponent, TestPipe],
    providers: [ReportService],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
