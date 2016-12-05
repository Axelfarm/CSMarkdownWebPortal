//Nicholai
import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { ReportService } from './../Services/report.service';
var FileSaver = require('file-saver');
import { ParameterModel } from './../Models/parameter.model';



@Component({
    selector: 'report-window',
    templateUrl: 'app/Views/report.component.html',
    styleUrls: ['app/Styles/report.component.css']

})
export class ReportComponent implements OnInit {

    currentReport: string;

    constructor(private reportService: ReportService, private sanitizer: DomSanitizer) {
        /*_router.routerState.queryParams.subscribe(data => console.log('queryParams', data['st']));
        this._activatedRoute.params.subscribe(params => {
            console.log('params', params);
        });*/

        //_router.routerState.root.queryParams.subscribe(data => console.log(data));
       
    }

    ngOnInit() {
        var url = window.location.search;
        url = url.replace("?", "");
        var params = url.split("&");

        if (url.length > 0) {
            for (var i = 0; i < params.length; i++) {
                var keyValue = params[i].split('=');
                console.log(keyValue);
                if (keyValue[0] == "filename") {
                    this.reportService.reportModel.name = keyValue[1];
                }
                else if (keyValue[0] == "path") {
                    this.reportService.reportModel.reportID = keyValue[1];
                }
                else {
                    var parameter = new ParameterModel();
                    parameter.Key = keyValue[0];
                    parameter.Value.push(keyValue[1]);

                    this.reportService.reportModel.parameters.push(parameter);
                }
            }
        }
    }

    GetPdf() {
        this.reportService.GetPdf().subscribe(data => this.downloadFile(data));
    }

    private downloadFile(data: Response) {
        console.log("hit");
        var blob = new Blob([data], { type: 'application/pdf' });
        FileSaver.saveAs(blob, this.reportService.reportModel.name + ".pdf");
        //var url = window.URL.createObjectURL(blob);
    }
    
    ShowReport() {
        this.currentReport = this.reportService.reportModel.name;
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.reportService.ShowReport());
        
    }

}