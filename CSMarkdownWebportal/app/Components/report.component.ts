//Nicholai
import { Component, OnInit } from '@angular/core';
import { ReportService } from './../Services/report.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'report-window',
    templateUrl: 'app/Views/report.component.html',
    styleUrls: ['app/Styles/report.component.css']
})
export class ReportComponent implements OnInit {


    constructor(private reportService: ReportService, private sanitizer: DomSanitizer, private route: ActivatedRoute) {
    }

    
     

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['reportName']) {
                this.reportService.reportModel.name = params['reportName'];
            }
        });
        this.ShowReport();
    }


    
    ShowReport() {
        console.log(this.reportService.reportModel.name);
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.reportService.ShowReport());
        
    }

}