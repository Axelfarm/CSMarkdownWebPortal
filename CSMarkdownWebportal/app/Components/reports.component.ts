﻿//Mads Nørgaard
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ReportService } from './../Services/report.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { ReportsModel } from './../Models/reports.model';


@Component({
    selector: 'reports',
    templateUrl: 'app/Views/reports.component.html',
    styleUrls: ['app/Styles/reports.component.css']
})
export class ReportsComponent implements OnInit {

    //reports: Observable<any>;
    data: any;
    errorMsg: any;
    reportss = new ReportsModel();

    constructor(private reportService: ReportService) {

    }

    ngOnInit() {
        this.GetReports();
        //console.log(this.reportService.data);
        //console.log(this.reportss);
    }

    GetReports() {
        /*this.test = this.reportService.GetReports();
        console.log(this.test);*/


        this.reportService.GetReports()
            .subscribe(
            data => this.data = data,
            error => this.errorMsg = <any>error,
            () => {
                this.reportss = this.reportss.AddDirectory(this.data);
                console.log(this.reportss);
                //console.log(this.test);
                /*this.reportss.name = this.data.Name;
                this.reportss.files = this.data.Files;
                for (var i = 0; i < this.reportss.files.length; i++) {
                    this.reportss.files[i] = this.reportss.files[i].replace(".smd", "");
                }*/
                /*var folders = Array<Object>();
                if (this.data.Folders != " ") {
                    console.log("Hit 1");
                    var report = new ReportsModel();
                    for (var property in this.data.Folders) {
                        report.name = this.data.Folders[property].Name;
                        report.files = this.data.Folders[property].Files;
                        for (var i = 0; i < report.files.length; i++) {
                            report.files[i] = this.reportss.files[i].replace(".smd", "");
                        }
                        this.reportss.folders.push(report);
                    }
                }*/

                //this.reportss = this.reportss.AddDirectory(this.data.Name, this.data.Files, folders);

            }
        );

        /*console.log("Test: " + this.test);
        console.log(this.reports);*/
    }

    ShowReport(reportName: string) {
        //console.log(this.reportService.report);
        this.reportService.reportName = reportName;
        //console.log(this.reportService.report);
    }


    


}