//Nicholai
import { Component, OnInit } from '@angular/core';
import { ReportService } from './../Services/report.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
    selector: 'report-window',
    templateUrl: 'app/Views/report.component.html',
    providers: [ReportService],
    styleUrls: ['app/Styles/report.component.css']
})
export class ReportComponent implements OnInit {


    constructor(private reportService: ReportService, private sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        
    }
    //report: ReportModel
    ShowReport() {
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.reportService.ShowReport());
    }

}