//Nicholai
class ReportModel {
    reportID: string;
    name: string;
    parameters: Array<ParameterModel>;

    GetParameterByKey(key: string): ParameterModel {
        for (var i: number; i < this.parameters.length; i++){
            if (this.parameters[i].key === key) {
                return this.parameters[i];
            };
        };
        return null;
    }
}