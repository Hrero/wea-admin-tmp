import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-app-home',
    templateUrl: './app-home.component.html',
    styleUrls: ['./app-home.component.less']
})
export class AppHomeComponent implements OnInit {

    constructor() { }

    public menuList = [];

    onDeactivate() {
        window.scrollTo(0, 0);
    }
    ngOnInit(): void {
    }
}
