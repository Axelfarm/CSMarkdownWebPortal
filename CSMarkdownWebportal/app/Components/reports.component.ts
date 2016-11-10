//Mads Nørgaard
import { Component, OnInit } from '@angular/core';
import { ReportService } from './../Services/report.service';
import 'rxjs/Rx';



@Component({
    selector: 'reports',
    templateUrl: 'app/Views/reports.component.html',
    providers: [ReportService],
    styleUrls: ['app/Styles/reports.component.css']
})
export class ReportsComponent implements OnInit {

    reports = ["markdown_001.smd",
        "markdown_002.smd",
        "markdown_2_legends.smd",
        "markdown_2_legends_1_type.smd",
        "markdown_2_legends_2_types.smd",
        "markdown_2_legends_2_types_4_different_date_formats.smd",
        "markdown_3_legends_with_array_of_dates_readTags.smd",
        "markdown_5_legends_using_readTags.smd",
        "markdown_custom_dateformat.smd",
        "markdown_display_error.smd",
        "markdown_display_message.smd",
        "markdown_display_warning.smd",
        "markdown_error_display.smd",
        "markdown_error_throw.smd",
        "markdown_failure.smd",
        "markdown_inline_code.smd",
        "markdown_legend.smd",
        "markdown_min_and_max_values.smd",
        "markdown_min_value.smd",
        "markdown_multiple_value_without_legends.smd",
        "markdown_multiple_value_with_legends_defined.smd",
        "markdown_no_legends.smd",
        "markdown_null_data.smd",
        "markdown_parameters.smd",
        "markdown_pie_and_donut_chart.smd",
        "markdown_read_excel_csv.smd",
        "markdown_renderChart_yaml_multiple_tags_x_date_params_from_and_to.smd",
        "markdown_render_10_charts.smd",
        "markdown_syntax_test.smd",
        "markdown_table.smd",
        "markdown_table_with_options.smd",
    ];

    test: any;

    constructor(private reportService: ReportService) {

    }

    ngOnInit() {
        this.GetReports();
    }

    GetReports() {
        this.test = this.reportService.GetReports();
        console.log(this.test);
    }

    generateArray(obj) {
        return Object.keys(obj).map((key) => { return obj[key] });
    }


}