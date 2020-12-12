import {Component, Input, OnInit} from '@angular/core';
import {LocalService} from '../../ng-sevice/local.service';
import {Router} from '@angular/router';
import {StateService} from '../../ng-sevice/state.service';
import {HttpService} from '../../ng-sevice/http.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';

@Component({
    selector: 'app-header',
    templateUrl: './app-header.component.html',
    styleUrls: ['./app-header.component.less']
})
export class AppHeaderComponent implements OnInit {

    @Input() sysName;
    @Input() menuList;
    public userInfo;
    public username;

    public menuShow;
    public isMobile;

    constructor(
        private router: Router,
        private local: LocalService,
        private state: StateService,
        private https: HttpService
    ) {
        this.isMobile = state.checkIsMobile();
        this.menuShow = !this.isMobile;
    }

    changeShow() {
        this.menuShow = !this.menuShow;
    }

    logout() {
        this.router.navigate(['/login']).then(() => {
            this.local.clearLoacl('token');
        });
    }

    toUrl(url) {
        this.router.navigate([url]).then(() => {
            if (this.isMobile) {
                this.menuShow = false;
            }
        });
    }

    getUserInfo() {
        let userInfo = this.local.getLocal('userInfo'); // 改
        if(userInfo){
            this.state.setUserInfo(userInfo);
            this.userInfo = userInfo;
        }else{
            this.logout();
        }
    }

    ngOnInit() {
        this.state.getUserInfo.subscribe(hasGet => {
            if (hasGet) {
                this.userInfo = hasGet;
            } else {
                this.getUserInfo()
            }
        });
        this.username = this.local.getLocal('userinfo').flowerName;
    }
}
