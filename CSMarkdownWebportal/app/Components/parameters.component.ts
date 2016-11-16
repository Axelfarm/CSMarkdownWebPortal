//Nicholai Axelgaard
import { Component, OnInit } from '@angular/core';
import { ReportService } from './../Services/report.service';

import { Http, Headers } from '@angular/http';

import { ReportModel } from './../Models/report.model';

import { ParameterModel } from './../Models/parameter.model';

@Component({
    selector: 'parameters',
    templateUrl: 'app/Views/parameters.component.html',
    providers: [ReportService],
    styleUrls: ['app/Styles/parameters.component.css']
})
export class ParametersComponent implements OnInit {

    data: Array<Array<any>>;
    logError: any;


    report: ReportModel;
    constructor(private reportService: ReportService, private http: Http) {
        this.GetParameters();
    }

    ngOnInit() {
    }

    // PT Is the report name hardcoded, but when it is made so that it sends the report to this component, then it will showhow
    // set this.report to the received report object.
    GetParameters(): void {
        // These two lines of code are currently hardcoded, but in the future it needs to be replace by fx
        // a report object defined at an earlier stage.
        this.report = new ReportModel();
        this.report.name = 'markdown_renderChart_yaml_multiple_tags_x_date_params_from_and_to';
        this.reportService.GetParameters(this.report).subscribe(
            data => this.data = data,
            err => this.logError(err),
            () => {
                for (var i = 0; this.data.length > i; i++) {
                    this.report.AddParamert(this.data[i]);
                }
            }
        );
        //console.log(this.report);
    }

    SplitValueForMultipleInputFields(paramType: string, value: string): Array<Array<string>> {
        var splitValues: Array<Array<string>> = new Array<Array<string>>();
        if (paramType != undefined && paramType.toLowerCase().includes("date")) {
            var arrOfValues: Array<string> = value.split("T");
            splitValues.push([ "date", arrOfValues[0] ]);
            splitValues.push([ "time", arrOfValues[1] ]);
        }
        else
            splitValues.push(["text", value.trim()]);
        return splitValues;
    }
}