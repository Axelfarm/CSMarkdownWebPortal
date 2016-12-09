import { Injectable, Component } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/Rx';

import { ReportModel } from './../Models/report.model';

@Injectable()
export class ReportService {
    data: any;
    logError: any;
    constructor(private http: Http, public reportModel: ReportModel) {

    }

    params: string;
    report: string;
    
    //reportName: string;
    private baseUrl = "http://localhost/csmarkdown/";


    //Nicholai Axelgaard
    ShowReport(): string {
        //console.log(this.report);
        this.params = "";
        //console.log("outside");
        if (this.reportModel.parameters != undefined && this.reportModel.parameters.length > 0) {
            //console.log("inside");
            for (var p: number = 0; this.reportModel.parameters.length > p; p++) {
                if (p > 0)
                    this.params += "&" + this.reportModel.parameters[p].Key + "=";

                else
                    this.params += this.reportModel.parameters[p].Key + "=";
                for (var v: number = 0; this.reportModel.parameters[p].Value.length > v; v++) {
                    if (this.reportModel.parameters[p].Value[v].trim() !== "") {

                        if (this.reportModel.parameters[p].ParamType.toLowerCase().includes("date")) {
                            if (v > 0)
                                this.params += "," + this.reportModel.parameters[p].Value[v].replace("T", ".");
                            else
                                this.params += this.reportModel.parameters[p].Value[v].replace("T", ".");
                        }
                        else {
                            if (v > 0)
                                this.params += "," + this.reportModel.parameters[p].Value[v];
                            else
                                this.params += this.reportModel.parameters[p].Value[v];
                        }
                        this.params = this.params.replace("=,", "=");
                        this.params = this.params.replace(",,", ",");
                        this.params = this.params.replace(",&", "&");
                    }
                    // else if (this.reportModel.parameters[p].Value[v].trim() == "") {
                    //    this.reportModel.parameters[p].Value.splice(v, 1);
                    // }
                }
            }
            //console.log(this.params);
            //console.log(this.baseUrl + "render/" + this.reportModel.reportID + "?" + this.params);
            if (this.reportModel.reportID != undefined && this.reportModel.reportID.length > 0) {
                return this.baseUrl + "render/" + this.reportModel.name + "?" + this.params + "&path=" + this.reportModel.reportID;
            }
            else {
                return this.baseUrl + "render/" + this.reportModel.name + "?" + this.params;
            }
        }
        if (this.reportModel.reportID != undefined && this.reportModel.reportID.length > 0) {
            return this.baseUrl + "render/" + this.reportModel.name + "?path=" + this.reportModel.reportID;
        }
        else
            return this.baseUrl + "render/" + this.reportModel.name;  //+ report.name;
    }



    //Mads Nørgaard
    GetReports(): Observable<any> {
        return this.http.get(this.baseUrl + "getReports", ).map((res: Response) => res.json());
            
    }

    //Nicholai Axelgaard
    GetParameters() {
        //return this.http.get(this.baseUrl + 'params/' + report.name).map(res => res.json());
        return this.http.get(this.baseUrl + "params/" + this.reportModel.name)
            .map(res => res.json());

        //return this.data;
    }

    //Mads Nørgaard
    GetPdf(): Observable<any> {
        var url = this.baseUrl + "render/" + this.reportModel.name + "?pdf=true";

        if (this.reportModel.reportID != "") {
            url += "&path=" + this.reportModel.reportID;
        }

        return this.http.get(url);
        
    }
    
    
}