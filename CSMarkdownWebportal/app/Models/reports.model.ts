// Mads
import { ReportModel } from './report.model';
export class ReportsModel {
    name: string;
    files: Array<string>;
    folders: Array<ReportsModel>;

    constructor() {

    }


    AddDirectory(data: Object): ReportsModel{
        var reports = new ReportsModel();

        reports.name = data["Name"];


        for (var file in data["Files"]) {
            var report = new ReportModel();   

            report.name = file.replace(".smd", "");
            report.reportID = "" + file; //ToDo
        }

        reports.files = data["Files"];

        var folder = new Array<ReportsModel>();
        if (data["Folders"] != " ") {
            for (var parameter in data["Folders"]) {
                folder.push(reports.AddDirectory(data["Folders"][parameter]));
            }
            reports.folders = folder;
        }

        return reports;
    }
}