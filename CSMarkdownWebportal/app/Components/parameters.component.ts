//Mads Nørgaard
import { Component, OnInit } from '@angular/core';
import { ReportService } from './../Services/report.service';



@Component({
    selector: 'parameters',
    templateUrl: 'app/Views/parameters.component.html',
    providers: [ReportService],
    styleUrls: ['app/Styles/parameters.component.css']
})
export class ParametersComponent implements OnInit {


    constructor(private reportService: ReportService) {

    }

    ngOnInit() {
        
    }

}