//Core
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
//import { routing, appRoutingProviders } from '../app.routing';
//import { LocationStrategy, HashLocationStrategy } from '@angular/common'; 

//Shared components
import { AppComponent } from './../Components/app.component';
import { ReportComponent } from './../Components/report.component';
import { ParametersComponent } from './../Components/parameters.component';
import { ReportsComponent } from './../Components/reports.component';
//import { TreeModule } from 'angular2-tree-component';
import { InputTextModule, TreeModule, ToolbarModule, ButtonModule } from 'primeng/primeng';
import { CollapseModule } from 'ng2-bootstrap';

//Shared services
import { ReportService } from './../Services/report.service';

//Shared models
import { ReportModel } from './../Models/report.model';


@NgModule({
    imports: [BrowserModule, HttpModule, TreeModule, ToolbarModule, ButtonModule, CollapseModule],
    declarations: [AppComponent, ReportComponent, ReportsComponent, ParametersComponent],
    providers: [ReportService, ReportModel], //, { provide: LocationStrategy, useClass: HashLocationStrategy }
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
