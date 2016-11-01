import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'my-app',
    template: '<iframe src=\"http://localhost/csmarkdown/render/markdown_2_legends \"></iframe>',
    styleUrls: ['app/Styles/app.component.css']
})
export class AppComponent implements OnInit {
    ngOnInit() {
        //document.getElementById("e").innerHTML = "";
        
    }

}
