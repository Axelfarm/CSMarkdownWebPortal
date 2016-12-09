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
    providers: [CollapseDirective]
})
export class ParametersComponent {
    logError: any;
    localParameters: Array<ParameterModel> = new Array<ParameterModel>();

    constructor(private reportService: ReportService, private http: Http, private reportModel: ReportModel) {
    }
    GetParameters(): void {
        if (this.reportModel.parameters.length > 0 && !this.isCollapsed)
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
                //    if (this.localParameters[p].ParamType.toLowerCase().includes("[]") && this.localParameters[p].Value[this.localParameters[p].Value.length - 1] != "")
                //        this.localParameters[p].Value.push("");
                //}
            }
        );
        this.isCollapsed = !this.isCollapsed;
    }

    SplitValueForMultipleInputFields(paramType: string, value: string): Array<Array<string>> {
        var splitValues: Array<Array<string>> = new Array<Array<string>>();
        if (paramType != undefined && paramType.toLowerCase().includes("date")) {
            var arrOfValues: Array<string> = value.split("T");
            splitValues.push(["date", arrOfValues[0]]);
            splitValues.push(["time", arrOfValues[1]]);
        }
        else
            splitValues.push(["text", value.trim()]);
        return splitValues;
    }

    GetParams(event: any) {
        this.GetParameters();
        console.log(this.reportModel.parameters);
    }

    ShowReportInLog2(event: any) {
        //this.localParameters = new Array<ParameterModel>();
        //for (let parameter in this.reportModel.parameters)
        //    this.localParameters.push(Object.assign({}, this.reportModel.parameters[parameter]) as ParameterModel);
        console.log(this.localParameters);
    }

    RefreshReport() {
        this.reportModel.parameters = JSON.parse(JSON.stringify(this.localParameters));
    }

    // Currently, when it comes to date and time, it is using two input fields. One for date
    // and one for time. If it is wanted to have a combined input field for both date and time,
    // then simply replace the InputChanged method with:
    //
    // InputChanged(p: number, v: number, value: string) {
    //     this.reportModel.parameters[p].Value[v] = value;
    // }
    //
    // And in the parameters.component.html replace:
    // <div *ngFor="let val of SplitValueForMultipleInputFields(param.ParamType, value); let s = index" style= "display:inline" >
    //      <input #input type= "{{val[0]}}"[value] = "val[1]"(change) = "InputChanged(k,v,s,input.value,param.ParamType)" />
    // </div>
    //
    // with:
    // 
    // <input #input type="{{param.ParamType}}" [value]="value" (change)="InputChanged(k,v,input.value)"/>
    // 
    // Furthermore: there is a line in AddToCollection in report.model.ts which goes: param.ParamType = "datetime-local";
    // If the input fields are split up as of now, it has no effect. However, if it is decided to use one input for both,
    // it will read it as local time. Not sure if that will have any effect once it's send to the Report rendering,
    // since it just takes the value from the input field and sends it to the server as it is shown.

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
        console.log("Change");
        console.log(this.currentEvent);
        console.log(event);
        console.log(FocusEvent);

        if (!this.localParameters[p].ParamType.toLowerCase().includes("date")) {

            if ((<HTMLInputElement>event.currentTarget).value == "" && v != this.localParameters[p].Value.length - 1) {
                //var index = this.reportModel.parameters[p].Value[v].indexOf("");
                this.localParameters[p].Value.splice(v, 1);
            }
            else {
                this.localParameters[p].Value[v] = (<HTMLInputElement>event.currentTarget).value;
                //this.localParameters[p].Value[v] += event.key;

            }

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
    currentEvent: any;
    InputGotFocus(p: number, v: number, event: any) {
        this.currentEvent = event;
        console.log(event);
        //if (this.localParameters[p].Value[v].trim() == "")
        //    (<HTMLInputElement>event.target).value = "";
    }

    InputLostFocus(p: number, v: number, event: FocusEvent) {
        
        if (this.localParameters[p].ParamType.toLowerCase().includes("date"))
            this.localParameters[p].Value[v] = (<HTMLInputElement>event.currentTarget).value;


        for (var i: number = 0; this.localParameters[p].Value.length > i; i++)
            if (this.localParameters[p].Value[i].trim() == "" && this.localParameters[p].Value.length - 1 != i)
                this.localParameters[p].Value.splice(i, 1);
    }

    AddNewBefore(p: number, v: number) {
        this.localParameters[p].Value.splice(v, 0, "");
    }

    IsItAnArray(paramType: string): boolean {
        if (paramType.toLowerCase().includes("[]"))
            return true;
        else
            return false;
    }
    AddNewAtEnd(p: number) {
        this.localParameters[p].Value.push("");
    }
    RemoveThis(p: number, v: number) {
        this.localParameters[p].Value.splice(v, 1);
    }

    public isCollapsed: boolean = false;

    public collapsed(event: any): void {

    }

    public expanded(event: any): void {

    }
}