// Mads
export class ReportsModel {
    name: string;
    files: Array<string>;
    folders: Array<ReportsModel>;

    constructor() {

    }

    /*AddDirectory(name: string, files: Array<string>, folders: Array<Object>): ReportsModel {

        var report = new ReportsModel();

        report.name = name;

        for (var i = 0; i < files.length; i++) {
            files[i] = files[i].replace(".smd", "");
        }

        report.files = files;


        for (var i = 0; i < folders.length; i++){

            
            
        }

        console.log(name);
        console.log(files);
        console.log(folders);

        return report;
    }*/

    AddDirectory(data: Object): ReportsModel{
        var report = new ReportsModel();

        report.name = data["Name"];
        report.files = data["Files"];

        var folder = new Array<ReportsModel>();
        if (data["Folders"] != " ") {
            for (var parameter in data["Folders"]) {
                folder.push(report.AddDirectory(data["Folders"][parameter]));
            }
            report.folders = folder;
        }

        return report;
    }
}