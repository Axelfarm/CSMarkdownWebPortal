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

    private lastReportUsed: string = "";
    GetParameters(): void {
        if (this.localParameters != undefined && 1 > this.localParameters.length || this.reportService.reportModel.name != this.lastReportUsed) {
            this.lastReportUsed = this.reportService.reportModel.name;
            this.reportModel.parameters = new Array();
            this.reportService.GetParameters().subscribe(
                data => {
                    for (let each of data as Array<Object>)
                        this.reportModel.AddParameter(each);
                },
                err => this.logError = err,
                () => {
                    this.localParameters = new Array<ParameterModel>();
                    for (var p: number = 0; this.reportModel.parameters.length > p; p++) {
                        this.localParameters.push(JSON.parse(JSON.stringify(this.reportModel.parameters[p])));

                    }
                    //for (var p: number = 0; this.localParameters.length > p; p++) {
                    //    for (var v: number = 0; this.localParameters[p].Value.length > v; v++) {

                    //    }
                    //    if (this.localParameters[p].ParamType.toLowerCase().includes("[]") && this.localParameters[p].Value[this.localParameters[p].Value.length - 1] != "")
                    //        this.localParameters[p].Value.push("");
                    //}
                }
            );
        }

        this.collapse.isCollapsed = !this.collapse.isCollapsed;
    }

    //SplitValueForMultipleInputFields(paramType: string, value: string): Array<Array<string>> {
    //    var splitValues: Array<Array<string>> = new Array<Array<string>>();
    //    if (paramType != undefined && paramType.toLowerCase().includes("date")) {
    //        var arrOfValues: Array<string> = value.split("T");
    //        splitValues.push(["date", arrOfValues[0]]);
    //        splitValues.push(["time", arrOfValues[1]]);
    //    }
    //    else
    //        splitValues.push(["text", value.trim()]);
    //    return splitValues;
    //}
    ResetParameters(event: any) {
        this.localParameters = new Array<ParameterModel>();
        for (var p: number = 0; this.reportModel.parameters.length > p; p++) {
            this.localParameters.push(JSON.parse(JSON.stringify(this.reportModel.parameters[p])));

        }
    }

    GetParams(event: any) {
        if (this.localParameters != undefined && 1 > this.localParameters.length)
            this.GetParameters();
        //console.log(this.reportModel.parameters);
    }

    ShowReportInLog2(event: any) {
        //this.localParameters = new Array<ParameterModel>();
        //for (let parameter in this.reportModel.parameters)
        //    this.localParameters.push(Object.assign({}, this.reportModel.parameters[parameter]) as ParameterModel);
        console.log(this.localParameters);
    }

    RefreshReport() {
        this.reportService.reportModel.parameters = JSON.parse(JSON.stringify(this.localParameters));
    }

    name: string;
    // s: number,  has been removed since it currently doesn't use split
    InputChanged(p: number, v: number, event: KeyboardEvent) {
        //if (paramType.toLowerCase().includes("date")) {
        //    var datetimesplit = this.localParameters[p].Value[v].split("T");
        //    datetimesplit[s] = (<HTMLInputElement>event.target).value;
        //    this.localParameters[p].Value[v] = datetimesplit[0] + "T" + datetimesplit[1];
        //}

        //else
        //if (this.localParameters[p].ParamType.toLowerCase().includes("[]") && this.localParameters[p].Value[this.localParameters[p].Value.length - 1] == "")
        //    this.localParameters[p].Value.pop();
        //console.log("Change");
        //console.log(this.currentEvent);
        //console.log(event);
        //console.log(FocusEvent);

        if (!this.localParameters[p].ParamType.toLowerCase().includes("date")) {

            //if ((<HTMLInputElement>event.currentTarget).value == "" && v != this.localParameters[p].Value.length - 1) {
            //    //var index = this.reportModel.parameters[p].Value[v].indexOf("");
            //    this.localParameters[p].Value.splice(v, 1);
            //}
            //else {
            this.localParameters[p].Value[v] = (<HTMLInputElement>event.currentTarget).value;
            //this.localParameters[p].Value[v] += event.key;

            //}

            //this.localParameters[p].Value.push("");
        }

    }

    //KeyUpRegistred(p: number, v: number, event: any) {
    //    if (v == this.localParameters[p].Value.length - 1 && this.localParameters[p].ParamType.toLowerCase().includes("[]")) {
    //        console.log(this.localParameters[p].Value.length);
    //        //this.localParameters[p].Value.push("");
    //        this.localParameters[p].Value[this.localParameters[p].Value.length] = "";
    //        console.log(this.localParameters[p].Value.length);
    //    }
    //    console.log(event);
    //}

    //InputFocused(p: number, v: number, event: any) {
    //    if (this.localParameters[p].ParamType.includes("[]") && this.localParameters[p].Value[this.localParameters[p].Value.length - 1] != "") {
    //        this.localParameters[p].Value.push("");
    //    }
    //    else if (this.localParameters[p].ParamType.includes("[]") && this.localParameters[p].Value.length -1 == v)
    //        this.localParameters[p].Value.push("");
    //}

    //currentEvent: any;
    //InputGotFocus(p: number, v: number, event: any) {
    //    this.currentEvent = event;
    //    console.log(event);
    //    //if (this.localParameters[p].Value[v].trim() == "")
    //    //    (<HTMLInputElement>event.target).value = "";
    //}

    InputLostFocus(p: number, v: number, event: FocusEvent) {

        if (this.localParameters[p].ParamType.toLowerCase().includes("date"))
            this.localParameters[p].Value[v] = (<HTMLInputElement>event.currentTarget).value;


        //for (var i: number = 0; this.localParameters[p].Value.length > i; i++)
        //    if (this.localParameters[p].Value[i].trim() == "" && this.localParameters[p].Value.length - 1 != i)
        //        this.localParameters[p].Value.splice(i, 1);
    }

    AddNewBefore(p: number, v: number, event: any) {
        this.localParameters[p].Value.splice(v, 0, "");
    }

    //IsItAnArray(paramType: string): boolean {
    //    if (paramType.toLowerCase().includes("[]"))
    //        return true;
    //    else
    //        return false;
    //}

    AddNewAtEnd(p: number, event: any) {
        this.localParameters[p].Value.push("");
    }
    RemoveThis(p: number, v: number, event: any) {
        this.localParameters[p].Value.splice(v, 1);
    }

    //public isCollapsed: boolean = true;

    isCollapsed() {
        return this.collapse.isCollapsed;
    }

    public collapsed(event: any): void {

    }

    public expanded(event: any): void {

    }
}