import { Injectable } from '@angular/core';
import { HttpService } from '../ng-sevice/http.service';

export interface paramsInterface {
    urlKey: string;
    power?: number;
}
@Injectable({
    providedIn: 'root'
})
export class PowerService {
    constructor(
        private httpService: HttpService
    ) { }
    private groupSea = 1; // 集团
    private teamSea = 2; // 团队
    private privateSea = 3; // 私人

    public getViewApiUrl({urlKey, power}: paramsInterface):any {
        const urlList =  {
            synDing: '/org/user/synDing', // 同步钉钉
            deptList: '/org/dept/list', // 获取部门
            deptListByPower: '/org/dept/listJurisdiction', // 获取部门（公海、私海列表的筛选框（根据权限获取））
            userCurrent: '/org/user/current', // 当前用户
            userJurisdiction: '/org/user/jurisdiction', // 当前用户的管理部门
            orgDeptUsers: '/org/dept/users' // 当前用户的管理部门
        }
        return Object.assign(urlList)[urlKey]
    }

    public getGroupSea(): number {
        return this.groupSea
    }
    public getTeamSea(): number  {
        return this.teamSea
    }
    public getPrivateSea(): number  {
        return this.privateSea
    }
}
