import { Component, OnInit, Inject } from '@angular/core';
import { HttpService } from '../ng-sevice/http.service';
import { isEmpty } from 'zgl-utils-js';
import { StateService } from '../ng-sevice/state.service';
import { MenuService } from '../ng-sevice/menu.service';
import { JurisdictionService } from '../ng-sevice/jurisdiction.service';

@Component({
    selector: 'app-content',
    templateUrl: './app-content.component.html',
    styleUrls: ['./app-content.component.less'],
})
export class AppContentComponent implements OnInit {

    public menuList: Array<any>;

    constructor(
        private https: HttpService,
        private state: StateService,
        private menuService: MenuService,
        private jurisdictionService: JurisdictionService
    ) {}

    rollTop() {
        window.scrollTo(0, 0);
    }
    checkPowerList() {
        this.jurisdictionService.setPowerList().subscribe(list => {
            this.menuList = list.menuList;
            console.log(this.menuList, '===');
        });
    }
    ngOnInit() {
        this.checkPowerList();
    }

}

