import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'Json' })
export class TestPipe implements PipeTransform {

    transform(value: Object, args?: any[]): any[] {


        return [];
    }
}