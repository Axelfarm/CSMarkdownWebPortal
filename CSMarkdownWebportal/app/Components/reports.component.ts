//Mads Nørgaard
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

    data: any;
    errorMsg: any;
    reportss = new ReportsModel();
    tree: any; //JSON Array

    constructor(private reportService: ReportService) {

    }
    
    ngOnInit() {
        this.GetReports();
    }


    CreateTree(reports: ReportsModel) {
        var tree = new Array();

        tree.push({
            'name': reports.name,
            'children': this.CreateNode(reports, "")
        });

        return tree;
    }


    CreateNode(reports: ReportsModel, path: string) {
        var node = new Array();

        for (var i = 0; i < reports.folders.length; i++) {
            node.push({
                'name': reports.folders[i].name,
                'children': this.CreateNode(reports.folders[i], path + reports.folders[i].name + "\\")
            });
        }

        for (var i = 0; i < reports.files.length; i++) {
            node.push({
                'name': reports.files[i].replace(".smd", ""),
                'path': path + reports.files[i].replace(".smd", "")
            });
        }

        return node;
    }

    GetReports() {
        this.reportService.GetReports()
            .subscribe(
            data => this.data = data,
            error => this.errorMsg = <any>error,
            () => {
                this.reportss = this.reportss.AddDirectory(this.data);
                console.log(this.reportss);
                //this.RenderDOM(this.CreateDOM(this.reportss, 0));
                this.tree = this.CreateTree(this.reportss);
            }
        );
        
    }

    ShowReport(reportName: string, reportPath: string) {
        //this.reportService.reportName = reportName;
        this.reportService.reportModel.name = reportName;
        this.reportService.reportModel.reportID = reportPath;
    }


    //Not in use
    private CreateDOM(reports: ReportsModel, index: number): string {
        var html: string;

        html += "<ul><li><input type=\"checkbox\" id=\item-" + index + "\" /> <label for=\"item-" + index + "\">" + reports.name + "</label><ul>";

        /*for (var i = 0; i < reports.folders.length; i++){
            html += this.CreateDOM(reports.folders[i], index++);
        }*/
        
        for (var i = 0; i < reports.files.length; i++)
        {
            html += "<li class=\"glyphicon glyphicon-file\" ><a (click)=\"ShowReport(" + reports.files[i].replace(".smd", "") + ")\">" + reports.files[i].replace(".smd", "") + "</a></li><br />";
        }
       
        
        html += "</ul></li></ul>";

        return html;

        //Template
        /*<ul>
            <li><input type="checkbox" id="item-0" /> <label for="item-0">{{reportss.name}}</label>
                <ul *ngFor='let report of reportss.files'>
                    <li class="glyphicon glyphicon-file" >
                        <a (click)="ShowReport(report)">{{report}}</a>
                    </li>
                </ul>
            </li>
        </ul>*/
    }

    //Not in use
    private RenderDOM(html: string) {
        var node = document.getElementById("tree");
        node.innerHTML = html;
    }
}