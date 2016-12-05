//Nicholai
import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { ReportService } from './../Services/report.service';
//import { Router, ActivatedRoute } from '@angular/router';
var fileSaver = require('file-saver');
import { ParameterModel } from './parameter.model';



@Component({
    selector: 'report-window',
    templateUrl: 'app/Views/report.component.html',
    styleUrls: ['app/Styles/report.component.css'],
    providers: []

})
export class ReportComponent implements OnInit {

    currentReport: string;

    constructor(private reportService: ReportService, private sanitizer: DomSanitizer) {
        /*_router.routerState.queryParams.subscribe(data => console.log('queryParams', data['st']));
        this._activatedRoute.params.subscribe(params => {
            console.log('params', params);
        });*/

        //_router.routerState.root.queryParams.subscribe(data => console.log(data));

        //this.activatedRoute.queryParams.subscribe(param => console.log(param));
    }

    ngOnInit() {
        var url = window.location.search;
        url = url.replace("?", "");
        if (url.length > 0) {
            var params = url.split("&");

            for (var param in params) {
                var KeyValue = param.split("=");

                if (KeyValue[0] == "filename") {
                    this.reportService.reportModel.name = KeyValue[1];
                }

                else if (KeyValue[0] == "path") {
                    this.reportService.reportModel.reportID = KeyValue[1];
                }

                else {
                    var parameter = new ParameterModel();

                    parameter.Key = KeyValue[0];
                    parameter.Value.push(KeyValue[1]);

                    this.reportService.reportModel.parameters.push(parameter);
                }
            }
        }
    }

    GetPdf() {
        console.log("hit start");
        this.reportService.GetPdf().subscribe(data => this.downloadFile(data));
    }

    private downloadFile(data: Response) {
        console.log("hit");
        var blob = new Blob([data], { type: 'application/pdf' });
        console.log("hit 1");
        fileSaver.saveAs(blob, this.reportService.reportModel.name + ".pdf"); console.log("hit 2");
        //var url = window.URL.createObjectURL(blob);
    }
    
    ShowReport() {
        this.currentReport = this.reportService.reportModel.name;
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.reportService.ShowReport());
        
    }

}