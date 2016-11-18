//Nicholai Axelgaard
import { Component, OnInit } from '@angular/core';
import { ReportService } from './../Services/report.service';

import { Http, Headers } from '@angular/http';

import { ReportModel } from './../Models/report.model';

@Component({
    selector: 'parameters',
    templateUrl: 'app/Views/parameters.component.html',
    providers: [ReportService],
    styleUrls: ['app/Styles/parameters.component.css']
})
export class ParametersComponent implements OnInit {

    data: Array<Array<any>>;
    parameter: any;
    randomQuote: any;
    logError: any;

    constructor(private reportService: ReportService, private http: Http) {
    }

    ngOnInit() {
        this.GetParameters();
    }

    GetParameters() {
        var rep = new ReportModel();
        rep.name = 'markdown_renderChart_yaml_multiple_tags_x_date_params_from_and_to';
        this.reportService.GetParameters(rep).subscribe(
            data => this.data = data,
            err => this.logError(err),
            () => {
                //console.log(this.data);
                for (var i = 0; this.data.length > i; i++) {
                    //console.log(this.data[i]);
                    var currentObject: Object = this.data[i];
                    for (let identifier in this.data[i]) {
                        //console.log(currentObject[identifier]);
                    }
                }
            }
        );
        //var rep: ReportModel = new ReportModel();
        //rep.name = 'markdown_renderChart_yaml_multiple_tags_x_date_params_from_and_to';
        //rep.reportID = 'markdown_renderChart_yaml_multiple_tags_x_date_params_from_and_to';
        //var test: any = this.reportService.GetParameters(rep);
        //console.log(test);
    }
}