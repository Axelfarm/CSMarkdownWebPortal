import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

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
        return this.http.get(this.baseUrl + "getReports")
            .map(res => res.json)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    //Mads Nørgaard
    GetParameters() {
        this.http.get(this.baseUrl + "params/markdown_render_10_charts").map(res => res.json);
    }

    private extractData(res: Response | any) {
        let body = res.json();
        return body.data || { };
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
    
}