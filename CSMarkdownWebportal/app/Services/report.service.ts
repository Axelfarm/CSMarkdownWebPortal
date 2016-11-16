import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/Rx';

import { ReportModel } from './../Models/report.model';

@Injectable()
export class ReportService {
    data: any;
    logError: any;
    constructor(private http: Http) {

    }

    report: string;
    private baseUrl = "http://localhost/csmarkdown/";


    //Nicholai
    ShowReport() {
        //console.log(this.report);
        return this.baseUrl + "render/" + this.report;  //+ report.name;
    }
    //Mads Nørgaard
    GetReports(){
        return this.http.get(this.baseUrl + "getReports");
            

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
    
}