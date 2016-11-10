import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'Values' })
export class TestPipe implements PipeTransform {

    transform(value: any[], args?: any[]): any[] {
        let keyArr: any[] = Object.keys(value),
        dataArr = [];

        keyArr.forEach((key: any) => {
            dataArr.push(value[key]);
        });

        return dataArr;
    }
}