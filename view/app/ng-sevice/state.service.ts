import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

interface NavItem {
    projectId: number;
    list: Array<any>;
}

@Injectable({
    providedIn: 'root'
})
export class StateService {

    // 用户权限
    private permissionSubject = new BehaviorSubject<any>(false);
    public getPermission = this.permissionSubject.asObservable();
    public navList: Array<NavItem> = []; // 数组NavItem对象
    public permissionList: Array<string> = [];
    // 登录状态
    public isLoggedIn: boolean;
    public loginToken: string;
    public redirectUrl: string;
    // 用户信息
    private userSubject = new BehaviorSubject<any>(false);
    public getUserInfo = this.userSubject.asObservable();
    public userInfo;
    // 菜单
    private menuSubject = new BehaviorSubject<any>(false);
    public getTopMenu = this.menuSubject.asObservable();
    // 用户系统信息
    private userSystemSubject = new  BehaviorSubject<any>(false);
    public getUserSystemInfo = this.userSystemSubject.asObservable();
    public userSystemInfo;

    constructor() {}

    setUserSystemInfo() {
        const userAgentInfo = navigator.userAgent;
        const Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
        let flag = false;
        let userAgents;
        for (let v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = true;
                userAgents = Agents[v];
                break;
            }
        }
        const isMobile = flag || document.documentElement.clientWidth < 640;
        this.userSystemInfo = {
            isMobile: isMobile,
            userAgents: userAgents || 'PC'
        }
        this.userSystemSubject.next(this.userSystemInfo)
    }
    // 设备信息
    checkIsMobile() {
        const userAgentInfo = navigator.userAgent;
        const Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
        let flag = false;
        for (let v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = true;
                 break;
            }
        }
        return flag || document.documentElement.clientWidth < 640;
    }
    deviceWidth() {
        return screen.width;
    }

    // 设置用户信息
    setUserInfo(value) {
        this.userInfo = value;
        this.isLoggedIn = true;
        this.userSubject.next(value);
    }

    // 设置权限
    // setPermission(response) {
    //     if (response.data) {
    //         this.permissionList = Array.from(new Set([ ...this.permissionList, ...response.data.permission]));
    //         if (this.navList.some(item => item.projectId === response.data.projectId)) {
    //             this.navList = [...this.navList.filter(item => item.projectId !== response.data.projectId), {
    //                 projectId: response.data.projectId,
    //                 list: response.data.list.filter(item => item.url !== '/users/list' )
    //             }];
    //         } else {
    //             this.navList = [...this.navList, {
    //                 projectId: response.data.projectId,
    //                 list: response.data.list.filter(item => item.url !== '/users/list' )
    //             }];
    //         }
    //     }
    //     this.permissionSubject.next(this.navList);
    // }
    // 设置头部菜单
    // setTopMenu(res) {
    //     this.menuSubject.next(res);
    // }
}
