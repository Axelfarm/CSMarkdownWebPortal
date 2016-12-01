//Nicholai
import { Component} from '@angular/core';
import { Response } from '@angular/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { ReportService } from './../Services/report.service';
//import { Router } from '@angular/router';
var FileSaver = require('file-saver');



@Component({
    selector: 'report-window',
    templateUrl: 'app/Views/report.component.html',
    styleUrls: ['app/Styles/report.component.css'],
    providers: []

})
export class ReportComponent {

    currentReport: string;

    constructor(private reportService: ReportService, private sanitizer: DomSanitizer) {
        /*_router.routerState.queryParams.subscribe(data => console.log('queryParams', data['st']));
        this._activatedRoute.params.subscribe(params => {
            console.log('params', params);
        });*/

        //_router.routerState.root.queryParams.subscribe(data => console.log(data));
       
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