import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { ReportModel } from './../Models/report.model';

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


    data: any;
    logError: any;
    //Mads Nørgaard
    GetReports() {
        /*return this.http.get(this.baseUrl + "getReports")
            .map(res => res.json)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);*/

        

        return this.http.get(this.baseUrl + 'getReports')
            .map(res => res.json())
            .subscribe(
            data => this.data = data,
            err => this.logError(err),
            () => console.log(this.data)
            );

    }

    //Mads Nørgaard
    GetParameters() {
        this.http.get(this.baseUrl + "params/markdown_render_10_charts").map(res => res.json);
    }

    
}