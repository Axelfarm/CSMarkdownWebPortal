import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

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

    //Nicholai Axelgaard
    GetParameters(report: ReportModel) {
        //return this.http.get(this.baseUrl + 'params/' + report.name).map(res => res.json());
        return this.http.get(this.baseUrl + "params/" + report.name)
            .map(res => res.json());
            
        //return this.data;
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
    
}