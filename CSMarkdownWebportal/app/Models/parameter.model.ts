class ParameterModel {
    key: string;
    values: Array<string>;
    paramType: string;

    constructor(key: string, values: string, paramType: string) {
        this.key = key;
        this.values = values.split(",");
        this.paramType = paramType;
    }
}