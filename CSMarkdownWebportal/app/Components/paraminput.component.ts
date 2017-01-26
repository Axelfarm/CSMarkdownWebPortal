import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'paraminput',
    template: '<input #param [value]="defaultContent" [type]="paramType" (keyup)="Change($event)" (change)="Change($event)"/>'
})
export class ParamInputComponent {
    @Input() name: string;
    @Input() defaultContent: string;
    @Input() paramType: string;
    @Output() newContent = new EventEmitter<string>();

    Change(cont: KeyboardEvent) {
        this.newContent.emit((<HTMLInputElement>event.currentTarget).value);
    }
}


