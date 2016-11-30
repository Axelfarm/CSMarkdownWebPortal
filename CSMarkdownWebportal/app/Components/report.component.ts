//Nicholai
import { Component} from '@angular/core';
import { ReportService } from './../Services/report.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
//import { Router } from '@angular/router';

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
        this.reportService.GetPdf();
    }
    
    ShowReport() {
        this.currentReport = this.reportService.reportModel.name;
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.reportService.ShowReport());
        
    }

}