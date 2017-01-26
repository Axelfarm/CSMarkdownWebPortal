import { ParameterModel } from './parameter.model';

//Nicholai Axelgaard
export class ReportModel {
    reportID: string;
    name: string;
    parameters: Array<ParameterModel> = new Array();

    GetParameterByKey(key: string): ParameterModel {
        for (var i: number; i < this.parameters.length; i++) {
            if (this.parameters[i].Key === key) {
                return this.parameters[i];
            };
        };
        return null;
    }

    AddParameter(parameter: Object): void {
        var param = new ParameterModel();
        for (let identifier in parameter) {
            if (identifier.toLowerCase().includes("key"))
                param.Key = parameter[identifier];
            else if (identifier.toLowerCase().includes("value")) {
                var tags: string = parameter[identifier];
                var arr = tags.split(",");
                param.Value = arr;
                for (var i = 0; param.Value.length > i; i++)
                    param.Value[i] = param.Value[i].trim();
            }
            else if (identifier.toLowerCase().includes("paramtype"))
                param.ParamType = parameter[identifier];
        }

        // Var der enighed om, at man ikke skal kunne skrive 5-4 for at få 1, når det gjaldt datoer?????

        if (param.ParamType.toLowerCase().includes("[]"))
            param.IsArray = true;
        else
            param.IsArray = false;

        if (param.ParamType.toLowerCase().trim() === "int" || param.ParamType.toLowerCase().trim() === "double")
            param.ParamType = "number";

        if (param.ParamType.toLowerCase().trim() === "string")
            param.ParamType = "text";

        if (param.ParamType.toLowerCase().includes("date")) {
            // Underneath it sets it to datetime, because if it is only "date", it will not show time.
            // However, since the parameters.component is using two input fields, one for date and one for time,
            // this currently doesn't have any effect, other than what it returns to the server. 
            // But in case it is decided to use one combined input
            // field for both date and time, then this makes sure that both definers are available.
            param.ParamType = "datetime-local";
            var date: Date = new Date();
            var emptyDate: Date = new Date(1970, 0, 1, 0, 0, 0);

            for (var i: number = 0; param.Value.length > i; i++) {
                var isItLocal: boolean;

                if (param.Value[i].toLowerCase().includes("x"))
                    isItLocal = true;
                else if (param.Value[i].toLowerCase().includes("u"))
                    isItLocal = false;

                if (param.Value[i].toLowerCase().includes("x") || param.Value[i].toLowerCase().includes("u")) {

                    var dateArr: Array<string> = param.Value.toString().split(".");
                    var localDate: Array<number> = [date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()];
                    var utcDate: Array<number> = [date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()];
                    for (var k: number = 0; dateArr.length > k; k++) {
                        var setNumber: number;
                        //console.log(dateArr[k]);
                        if (dateArr[k][0] == "x") {
                            dateArr[k] = dateArr[k].replace("x", "");

                            if (dateArr[k] != "")
                                setNumber = localDate[k] + eval(dateArr[k]) as number;

                            else
                                setNumber = localDate[k];

                            switch (k) {
                                case 0:
                                    emptyDate.setFullYear(setNumber);
                                    break;
                                case 1:
                                    emptyDate.setMonth(setNumber);
                                    break;
                                case 2:
                                    emptyDate.setDate(setNumber);
                                    break;
                                case 3:
                                    emptyDate.setHours(setNumber);
                                    break;
                                case 4:
                                    emptyDate.setMinutes(setNumber);
                                    break;
                                case 5:
                                    emptyDate.setSeconds(setNumber);
                                    break;
                            }
                        }
                        else if (dateArr[k][0] == "u") {
                            dateArr[k] = dateArr[k].replace("u", "");
                            if (dateArr[k] != "")
                                setNumber = utcDate[k] + eval(dateArr[k]) as number;

                            else
                                setNumber = utcDate[k];

                            switch (k) {
                                case 0:
                                    emptyDate.setUTCFullYear(setNumber);
                                    break;
                                case 1:
                                    emptyDate.setUTCMonth(setNumber);
                                    break;
                                case 2:
                                    emptyDate.setUTCDate(setNumber);
                                    break;
                                case 3:
                                    emptyDate.setUTCHours(setNumber);
                                    break;
                                case 4:
                                    emptyDate.setUTCMinutes(setNumber);
                                    break;
                                case 5:
                                    emptyDate.setUTCSeconds(setNumber);
                                    break;
                            }
                        }
                    }
                }
                if (isItLocal)
                    param.Value[i] = emptyDate.getFullYear().toString() + "-" + ("0" + (1 + emptyDate.getMonth()).toString()).slice(-2) + "-" + ("0" + emptyDate.getDate().toString()).slice(-2) + "T" + ("0" + emptyDate.getHours().toString()).slice(-2) + ":" + ("0" + emptyDate.getMinutes().toString()).slice(-2) + ":" + ("0" + emptyDate.getSeconds().toString()).slice(-2);
                else if (!isItLocal)
                    param.Value[i] = emptyDate.getUTCFullYear().toString() + "-" + ("0" + (1 + emptyDate.getUTCMonth()).toString()).slice(-2) + "-" + ("0" + emptyDate.getUTCDate().toString()).slice(-2) + "T" + ("0" + emptyDate.getUTCHours().toString()).slice(-2) + ":" + ("0" + emptyDate.getUTCMinutes().toString()).slice(-2) + ":" + ("0" + emptyDate.getUTCSeconds().toString()).slice(-2);

                param.Value[i] = param.Value[i];
            }
        }
        //console.log(param.Key);
        //console.log(param);

        this.parameters.push(param);
        //console.log("total prameter: ");
        //console.log(this.parameters);
        // In the code above, it is possible to just add the parameter as ParameterModel, instead of creating a param object
        // which will then be pushed. However, if the received parameter: Object is pushed directly, then the definition
        // of each object will be "Object", but when run like this, it will say "ParameterModel"
    }
}