import { Injectable } from '@angular/core';
import { getFilteraArrayList } from 'zgl-utils-js';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

    public menuList: Array<any> = [];

    constructor(
    ) { }
    public arrId = []; // 菜单id
    public menu = []
    public commonMenu = [
        {
            "name": "首页",
            "url": "/content/home/dashboard",
            "icon": "home",
            "isOpen": true,
            "hidden": false,
            "id": "1",
            "child": []
        }
    ]
    public setUserMenuAll(data: Array<number>):Array<object> {
        const that = this;
        const host = window.location.host;
        const ids = getFilteraArrayList(this.arrId, data);
            (function getListForMenu(data: any, ids) {
                data.forEach(item => {
                    ids.forEach(cur => {
                        if (item.id == cur) {
                            item.hidden = true;
                        }
                        if (item.child && item.child.length > 0) {
                            getListForMenu(item.child, ids);
                        }
                    })
                })
                that.menuList = data;
            })(this.menu, ids)
        return [...this.commonMenu, ...that.menuList];
    }
}
