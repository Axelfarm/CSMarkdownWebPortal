import { Component } from '@angular/core';

@Component({
    selector: 'report-window',
    templateUrl: 'app/Views/report.component.html',
    styleUrls: ['app/Styles/report.component.css']
})
export class ReportComponent {
    ShowReport(report: ReportModel, parameters: ParameterModel): void {

    }

    ExportToPDF(report: ReportModel, parameters: ParameterModel): void {

    }

}