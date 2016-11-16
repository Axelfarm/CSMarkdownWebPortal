//Mads Nørgaard
import { Component, OnInit } from '@angular/core';
import { ReportService } from './../Services/report.service';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/Rx';



@Component({
    selector: 'reports',
    templateUrl: 'app/Views/reports.component.html',
    styleUrls: ['app/Styles/reports.component.css']
})
export class ReportsComponent implements OnInit {

    reports = ["markdown_001",
        "markdown_002",
        "markdown_2_legends",
        "markdown_2_legends_1_type",
        "markdown_2_legends_2_types",
        "markdown_2_legends_2_types_4_different_date_formats",
        "markdown_3_legends_with_array_of_dates_readTags",
        "markdown_5_legends_using_readTags",
        "markdown_custom_dateformat",
        "markdown_display_error",
        "markdown_display_message",
        "markdown_display_warning",
        "markdown_error_display",
        "markdown_error_throw",
        "markdown_failure",
        "markdown_inline_code",
        "markdown_legend",
        "markdown_min_and_max_values",
        "markdown_min_value",
        "markdown_multiple_value_without_legends",
        "markdown_multiple_value_with_legends_defined",
        "markdown_no_legends",
        "markdown_null_data",
        "markdown_parameters",
        "markdown_pie_and_donut_chart",
        "markdown_read_excel_csv",
        "markdown_renderChart_yaml_multiple_tags_x_date_params_from_and_to",
        "markdown_render_10_charts",
        "markdown_syntax_test",
        "markdown_table",
        "markdown_table_with_options",
    ];

    test: any;

    constructor(private reportService: ReportService) {

    }

    ngOnInit() {
        this.GetReports();
        console.log(this.reportService.data);
    }

    GetReports() {
        /*this.test = this.reportService.GetReports();
        console.log(this.test);*/

        this.reportService.GetReports()
            .map(res => res.json())
            .subscribe(data => this.test = data);

        console.log(this.test);
    }

    ShowReport(report: string) {
        //console.log(this.reportService.report);
        this.reportService.report = report;
        //console.log(this.reportService.report);
    }
    


}