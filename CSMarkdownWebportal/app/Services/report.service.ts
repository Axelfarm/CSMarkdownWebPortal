import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/Rx';

import { ReportModel } from './../Models/report.model';

@Injectable()
export class ReportService {

    constructor(private http: Http) {

    }

    report: string;
    private baseUrl = "http://localhost/csmarkdown/";
    data: Object;
    private logError: any;

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

    //Mads Nørgaard
    GetParameters() {
        this.http.get(this.baseUrl + "params/markdown_render_10_charts").map(res => res.json);
    }

    
}