import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map';

import { ReportModel } from './../Models/report.model'

@Injectable()
export class ReportService {

    constructor(private http: Http) {

    }

    baseUrl = "http://localhost/csmarkdown/";

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
        this.http.get(this.baseUrl + "parameters/" + report.name).map(res => res.json);
    }

    
}