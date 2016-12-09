import { Directive, Input } from '@angular/core';

@Directive({ selector: '[collapse]' })
export class CollapseDirective {
    public isCollapsed: boolean = true;

    @Input() public set collapse(value: boolean){}
}