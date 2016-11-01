import { Component } from '@angular/core';

@Component({
    selector: 'report-window',
    templateUrl: './app/Tests/Documents/TestFile.html'
})
export class ReportComponent {
    ShowReport(report: ReportModel, parameters: ParameterModel): void {

    }

    ExportToPDF(report: ReportModel, parameters: ParameterModel): void {

    }

}