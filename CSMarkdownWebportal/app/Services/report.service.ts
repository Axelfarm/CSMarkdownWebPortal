﻿import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/Rx';

import { ReportModel } from './../Models/report.model';

@Injectable()
export class ReportService {
    data: any;
    logError: any;
    report: string;
    private baseUrl = "http://localhost/csmarkdown/";
    constructor(private http: Http) {

    }

    //Nicholai Axelgaard
    ShowReport() {
        //console.log(this.report);
        return this.baseUrl + "render/" + this.report;
    }


    //Mads Nørgaard
    GetReports() {
        return this.http.get(this.baseUrl + "getReports").map((res: Response) => res.json());
            

        /*this.http.get(this.baseUrl + 'getReports')
            .map(res => { return  res.json() })
            .subscribe(
            (data) => this.data = data,
            (err) => this.logError(err),
            () => console.log(this.data)
            );*/

        
        //console.log(this.data);
        //return this.data;
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

    private extractData(res: Response) {
        let body = res.json();
        //return body.data || {};
        this.data = body.data;
        console.log('Body.data: ' + body.data);
        console.log('this.data: ' + this.data);
    }  
}