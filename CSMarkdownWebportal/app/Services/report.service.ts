import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/Rx';

import { ReportModel } from './../Models/report.model';

@Injectable()
export class ReportService {
    
    reportName: string;
    private baseUrl = "http://localhost/csmarkdown/";
    constructor(private http: Http) {

    }

    //Nicholai Axelgaard
    ShowReport(): string {
        //console.log(this.report);
        if (this.reportName != undefined)
        {
            return this.baseUrl + "render/" + this.reportName.replace(".smd", "");
        }
        else
        {
            return this.baseUrl + "render/" + this.reportName;
        }
        
    }


    //Mads Nørgaard
    GetReports(): Observable<any> {
        return this.http.get(this.baseUrl + "getReports").map((res: Response) => res.json());
            
    }

    //Nicholai Axelgaard
    GetParameters(report: ReportModel): Observable<any> {
        //return this.http.get(this.baseUrl + 'params/' + report.name).map(res => res.json());
        return this.http.get(this.baseUrl + "params/" + report.name)
            .map(res => res.json());
            
        //return this.data;
    }

    
    
}