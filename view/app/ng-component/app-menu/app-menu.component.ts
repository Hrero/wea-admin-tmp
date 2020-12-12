import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { HttpService } from '../../ng-sevice/http.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app-menu.component.html',
    styleUrls: ['./app-menu.component.less']
})
export class AppMenuComponent implements OnInit {

    @Input() menuList;

    constructor(
        private router: Router,
        private https: HttpService
    ) {
    }

    toUrl(url: string) {
        this.router.navigate([url]).then(() => {});
    }

    ngOnInit() {
    }

}
