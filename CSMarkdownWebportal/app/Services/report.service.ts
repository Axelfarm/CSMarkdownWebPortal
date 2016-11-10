﻿import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map';

import { ReportModel } from './../Models/report.model';

@Injectable()
export class ReportService {
    data: any;
    logError: any;
    constructor(private http: Http) {

    }

    baseUrl = 'http://localhost/csmarkdown/';

    //report: ReportModel
    //Nicholai
    ShowReport() {
        return this.baseUrl + "render/markdown_render_10_charts" //+ report.name;

        
    }

    //Mads Nørgaard
    GetReports() {
        return this.http.get(this.baseUrl + "getReports").map(res => res.json);
    }

    //Mads Nørgaard
    GetParameters(report: ReportModel) {
        //return this.http.get(this.baseUrl + 'params/' + report.name).map(res => res.json());
       return this.http.get(this.baseUrl + "params/" + report.name)
            .map(res => res.json())
            .subscribe(
            data => this.data = data,
            err => this.logError(err),
            () => console.log(this.data)
            );
    }

    
}