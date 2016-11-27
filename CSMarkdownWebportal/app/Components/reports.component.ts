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

    constructor(private reportService: ReportService) {

    }

    tree: any;

    nodes =
    [
        {
            id: 1, name: 'Documents',
            children:
            [{
                id: 2, name: 'markdown_001'
            },
                {
                    id: 3,
                    name: 'markdown_2_legends_1_type'
                }]
        },
        {
            id: 4,
            name: 'root2',
            children:
            [
                {
                    id: 5, name: 'child2.1'
                },
                {
                    id: 6,
                    name: 'child2.2',
                    children:
                    [{ id: 7, name: 'subsub' }]
                }]
        }];


    CreateTree(reports: ReportsModel) {
        var tree = new Array();
        //var child = new Array();
        //var childchild = new Array();

        /*childchild.push({
            'name': 'tester'
        });*/

        /*for (var file in reports.files) {
            child.push({
                'name': file
            });
        }

        for (var i = 0; i < reports.folders.length; i++) {
            child.push({
                'name': reports.folders[i].name,
                'children': this.CreateTree(reports.folders[i])
            });
        }*/

        tree.push({
            'name': reports.name,
            'children': this.CreateNode(reports)
        });

        return tree;
    }

    ngOnInit() {
        this.GetReports();
        //console.log(this.reportss);
        //console.log(this.tree);
        //console.log(this.reportService.data);
        //console.log(this.reportss);
    }

    Update() {
        console.log(this.tree);
        console.log(this.nodes);
    }

    CreateNode(reports: ReportsModel) {
        var node = new Array();

        for (var i = 0; i < reports.files.length; i++) {
            node.push({
                'name': reports.files[i]
            });
        }

        for (var i = 0; i < reports.folders.length; i++) {
            node.push({
                'name': reports.folders[i].name,
                'children': this.CreateNode(reports.folders[i])
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
                //return this.reportss;
            }
        );
        
    }

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

    private RenderDOM(html: string) {
        var node = document.getElementById("tree");
        node.innerHTML = html;
    }

    

    ShowReport(reportName: string) {
        //console.log(this.reportService.report);
        this.reportService.reportName = reportName;
        //console.log(this.reportService.report);
    }


    


}