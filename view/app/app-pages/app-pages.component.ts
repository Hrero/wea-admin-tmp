import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-pages',
    templateUrl: './app-pages.component.html',
    styleUrls: ['./app-pages.component.less'],
})
export class AppPagesComponent implements OnInit {

    public menuList: Array<any>;
    public menuId: Array<any> = [1,2,3,4,5,141,282];

    constructor(
    ) {

    }

    rollTop() {
        window.scrollTo(0, 0);
    }

    ngOnInit(): void {
    }

}
