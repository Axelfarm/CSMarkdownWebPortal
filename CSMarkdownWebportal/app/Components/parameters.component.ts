//Nicholai Axelgaard
import { Component, Input } from '@angular/core';
import { Http, Headers } from '@angular/http'
import { ReportService } from './../Services/report.service';

import { CollapseDirective } from './../Services/collapse.directive';

import { ReportModel } from './../Models/report.model';
import { ParameterModel } from './../Models/parameter.model';


@Component({
    selector: 'parameters',
    templateUrl: 'app/Views/parameters.component.html',
    styleUrls: ['app/Styles/parameters.component.css'],
    providers: []
})
export class ParametersComponent {
    logError: any;
    private localParameters: Array<ParameterModel> = new Array<ParameterModel>();

    constructor(private reportService: ReportService, private http: Http, private reportModel: ReportModel, private collapse: CollapseDirective) {
    }


    inputFieldNames: Array<Array<string>>;
    GenerateArrayOfInput() {
        this.inputFieldNames = new Array<Array<string>>();
        for (var p: number = 0; this.localParameters.length > p; p++) {
            this.inputFieldNames.push(new Array<string>());
            for (var v: number = 0; this.localParameters[p].Value.length > v; v++) {
                this.inputFieldNames[p].push(("00" + p.toString().slice(-3)) + "." + ("00" + v.toString().slice(-3)));
            }
        }
        console.log(this.inputFieldNames);
    }




    private lastReportUsed: string = "";
    GetParameters(): void {
        if (this.localParameters != undefined && 1 > this.localParameters.length || this.reportService.reportModel.name != this.lastReportUsed) {
            this.lastReportUsed = this.reportService.reportModel.name;
            this.reportModel.parameters = new Array();
            this.reportService.GetParameters().subscribe(
                data => {
                    //console.log(data);
                    for (let each of data as Array<Object>)
                        this.reportModel.AddParameter(each);
                },
                err => this.logError = err,
                () => {
                    this.localParameters = new Array<ParameterModel>();
                    for (var p: number = 0; this.reportModel.parameters.length > p; p++) {
                        this.localParameters.push(JSON.parse(JSON.stringify(this.reportModel.parameters[p])));

                    }
                    this.GenerateArrayOfInput();
                }
            );
        }

        this.collapse.isCollapsed = !this.collapse.isCollapsed;
    }

    ResetParameters(event: any) {
        this.localParameters = new Array<ParameterModel>();
        for (var p: number = 0; this.reportModel.parameters.length > p; p++) {
            this.localParameters.push(JSON.parse(JSON.stringify(this.reportModel.parameters[p])));

        }
        this.GenerateArrayOfInput();
    }
    GetParams(event: any) {
        if (this.localParameters != undefined && 1 > this.localParameters.length)
            this.GetParameters();
    }

    RefreshReport() {
        this.reportService.reportModel.parameters = JSON.parse(JSON.stringify(this.localParameters));
    }
    NewContent(value: string, p: number, v: number) {
        this.localParameters[p].Value[v] = value;

    }

    name: string;
    AddNewBefore(p: number, v: number, event: any) {
        this.localParameters[p].Value.splice(v, 0, "");
        this.GenerateArrayOfInput();
    }


    AddNewAtEnd(p: number, event: any) {
        this.localParameters[p].Value.push("");
        this.GenerateArrayOfInput();
    }
  
    RemoveThis(p: number, v: number, event: any) {
        this.localParameters[p].Value.splice(v, 1);
        this.GenerateArrayOfInput();
    }


    isCollapsed() {
        return this.collapse.isCollapsed;
    }

    public collapsed(event: any): void {

    }

    public expanded(event: any): void {

    }
}
