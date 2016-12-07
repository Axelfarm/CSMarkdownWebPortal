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
    reports = new ReportsModel();
    tree: any; //JSON Array

    constructor(private reportService: ReportService) {
    }
    
    ngOnInit() {
        this.GetReports();
    }

    CreateTree(reports: ReportsModel, path: string = "") {
        var tree = new Array();

        //Load in subfolders
        for (var i = 0; i < reports.folders.length; i++) {
            tree.push({
                'label': reports.folders[i].name,
                "expandedIcon": "fa-folder-open",
                "collapsedIcon": "fa-folder",
                'children': this.CreateTree(reports.folders[i], path + reports.folders[i].name + "\\")
            });
        }

        //Load in smd files
        for (var i = 0; i < reports.files.length; i++) {
            tree.push({
                'label': reports.files[i].replace(".smd", ""),
                "icon": "fa-file",
                'path': path
            });
        }

        return tree;
    }

    GetReports() {
        this.reportService.GetReports()
            .subscribe(
            data => this.data = data,
            error => this.errorMsg = <any>error,
            () => {
                this.reports = this.reports.AddDirectory(this.data);
                //console.log(this.reports);
                //this.RenderDOM(this.CreateDOM(this.reports, 0));
                this.tree = this.CreateTree(this.reports);
            }
        );
        
    }

    nodeSelect(event: any) {
        //event.node = selected node

        this.reportService.reportModel.name = event.node.label;
        this.reportService.reportModel.reportID = event.node.path;
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
            <li><input type="checkbox" id="item-0" /> <label for="item-0">{{reports.name}}</label>
                <ul *ngFor='let report of reports.files'>
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