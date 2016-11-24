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


        /*for (var i = 0; i < data["Files"]; i++) {
            var report = new ReportModel();   

            //console.log(file);
            report.name = data["Files"][i].replace(".smd", "");
            report.reportID = "" + data["Files"][i]; //ToDo

            console.log(report);
            reports.files.push(report);
        }*/

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