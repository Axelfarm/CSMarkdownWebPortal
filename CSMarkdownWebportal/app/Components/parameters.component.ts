//Mads Nørgaard
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

    parameter: any;
     randomQuote: any;
 logError: any;
    constructor(private reportService: ReportService, private http:Http) {

    

    }

    ngOnInit() {
        this.GetParameters();
    }

    GetParameters() {
        var rep = new ReportModel();
        rep.name = 'markdown_renderChart_yaml_multiple_tags_x_date_params_from_and_to';
        this.parameter = this.reportService.GetParameters(rep);
        console.log(this.parameter)

        //var rep: ReportModel = new ReportModel();
        //rep.name = 'markdown_renderChart_yaml_multiple_tags_x_date_params_from_and_to';
        //rep.reportID = 'markdown_renderChart_yaml_multiple_tags_x_date_params_from_and_to';
        //var test: any = this.reportService.GetParameters(rep);
        //console.log(test);
    }
}