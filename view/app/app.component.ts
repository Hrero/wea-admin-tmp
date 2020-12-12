import {Component, OnInit} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import { StateService } from './ng-sevice/state.service';
import { JurisdictionService } from './ng-sevice/jurisdiction.service';

@Component({
    selector: 'app-root',
    template: `
      <router-outlet></router-outlet>
    `,
})

export class AppComponent implements OnInit {

    constructor(
        private state: StateService,
        private jurisdictionService: JurisdictionService
    ) {}

    checkUserSystem() {
        this.state.getUserSystemInfo.subscribe(res => {
            if (!res) {
                this.state.setUserSystemInfo();
            }
        });
    }

    ngOnInit(): void {
        this.checkUserSystem();
    }
}
