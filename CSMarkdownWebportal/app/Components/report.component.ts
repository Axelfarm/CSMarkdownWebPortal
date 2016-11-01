import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'report-window',
    template: '<iframe src=\"http://localhost/csmarkdown/render/markdown_2_legends \"></iframe>'
})
export class ReportComponent implements OnInit {
    ngOnInit() {
        //document.getElementById("e").innerHTML = "";

    }

}