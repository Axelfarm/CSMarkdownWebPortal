import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'values' })
export class TestPipe implements PipeTransform {

    transform(value: Object, args?: any[]): any[] {
        /*let keyArr: any[] = Object.keys(value),
            dataArr = [],
            keyName = args[0];


        keyArr.forEach((key: any) => {
            value[key][keyName] = key;
            dataArr.push(value[key])
        });*/

        return [];
    }
}