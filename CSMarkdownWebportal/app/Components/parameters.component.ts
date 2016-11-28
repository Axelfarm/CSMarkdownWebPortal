//Nicholai Axelgaard
import { Component, OnInit } from '@angular/core';
import { ReportService } from './../Services/report.service';

import { Http, Headers } from '@angular/http';

import { ReportModel } from './../Models/report.model';


@Component({
    selector: 'parameters',
    templateUrl: 'app/Views/parameters.component.html',
    styleUrls: ['app/Styles/parameters.component.css']
})
export class ParametersComponent implements OnInit {

    //data: Array<Array<any>>;
    logError: any;

    constructor(private reportService: ReportService, private http: Http, private reportModel: ReportModel) {
        this.GetParameters();
    }

    ngOnInit() {
    }

    // PT Is the report name hardcoded, but when it is made so that it sends the report to this component, then it will showhow
    // set this.report to the received report object.
    GetParameters(): void {
        //console.log(this.reportModel);
        // These two lines of code are currently hardcoded, but in the future it needs to be replace by fx
        // a report object defined at an earlier stage.
        if (this.reportModel.parameters.length > 0)
            this.reportModel.parameters = new Array();
        this.reportService.GetParameters().subscribe(
            data => { for (let each of data as Array<Object>) this.reportModel.AddParameter(each); },
            err => this.logError = err,
            () => this.reportModel
        );
        //console.log(this.reportModel);
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

    ShowReportInLog(err: any) {
        this.GetParameters();
        //console.log(this.reportModel);
    }

    ShowReportInLog2(err: any) {
        console.log(this.reportModel);
    }

    RefreshReport() {

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

     InputChanged(p: number, v: number, s: number, value: string, paramType: string){
          if(paramType.toLowerCase().includes("date")){
              var datetimesplit = this.reportModel.parameters[p].Value[v].split("T");
              datetimesplit[s] = value;
              this.reportModel.parameters[p].Value[v] = datetimesplit[0] + "T" + datetimesplit[1];
          }
          else {
              this.reportModel.parameters[p].Value[v] = value;
          }
     }
}