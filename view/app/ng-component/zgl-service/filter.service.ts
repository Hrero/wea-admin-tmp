import { Injectable } from '@angular/core';
import { HttpService } from '../../ng-sevice/http.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LocalService } from '../../ng-sevice/local.service';
import { isEmpty, getSmallObjectString } from 'zgl-utils-js';
import { PowerService } from '../../ng-sevice/power.service'
import { NzMessageService } from 'ng-zorro-antd/message';

interface FilterArray {
    name: any;
    value: any;
}

@Injectable({
    providedIn: 'root',
})
export class FilterService {

    private jurisdictionDept: Array<FilterArray>;
    private departmentList: Array<FilterArray>;
    private salePeopleList: Array<FilterArray>;

    private dataCenter = {} as any;

    constructor(
        private https: HttpService,
        private powerService: PowerService,
        private local: LocalService,
        private message: NzMessageService,
    ) {}

    getFilterData(key: string, data?: any): Observable<any> {
        switch (key) {
            case 'CustomerLevelEnum':
                return this.getCustomerEnum('CustomerLevelEnum');
            case 'CustomerSourceEnum':
                return this.getCustomerEnum('CustomerSourceEnum');
            case 'AuthTypeEnum':
                return this.getCustomerEnum('AuthTypeEnum');
            case 'CustomerStatusEnum':
                return this.getCustomerEnum('CustomerStatusEnum');
            case 'CustomerTagEnum':
                return this.getCustomerEnum('CustomerTagEnum');
            case 'CooperationIntentionEnum':
                return this.getCustomerEnum('CooperationIntentionEnum');
            case 'CompanySizeEnum':
                return this.getCustomerEnum('CompanySizeEnum');
            case 'CustomerIndustryEnum':
                return this.getCustomerEnum('CustomerIndustryEnum');
            case 'departmentList':
                return this.getdepartmentList('departmentList');
            case 'salesmanList':
                return this.getSalePeopleList(data.deptId);
            default:
                return of([]);
        }
    }
    
    getdepartmentList(data): Observable<any> {
        if (!isEmpty(this.departmentList)) {
            return of(this.departmentList)
        }
        return this.https.$post(this.powerService.getViewApiUrl({ urlKey: 'deptListByPower' }), 'ADMINAPISERVER', {}).pipe(
            switchMap(res => {
                if(!res.success){ this.message.error(res.message); return of([]) }
                if (res.data && res.data.length>0) {
                    this.departmentList = res.data.map(item => {
                        return { name: item.name, value: item.id }
                    });
                    return of(this.departmentList)
                } else{
                    return of([])
                }
            })
        );
    }

    getSalePeopleList(id): Observable<any>{
        if(!id){
            return of(this.salePeopleList);
        }else{
            return this.https.$post(this.powerService.getViewApiUrl({
                power: 3,
                urlKey: 'orgDeptUsers'
            }), 'ADMINAPISERVER' , {
                deptId: id,
                pageSize: 1000
            }).pipe(
                switchMap(res => {
                    if(!res.success){ this.message.error(res.message); return of([]) }
                    return of(res.data.list.map(res => {
                        return {
                            name: res.flowerName,
                            value: res.id
                        }
                    }) || [])
                })
            );
        }
    }

    getCustomerEnum(type): Observable<any> {
        if (this.dataCenter[type]) {
            return of(this.dataCenter[type]);
        }
        return this.https.$get('/sys/enums', 'ADMINAPISERVER',{
            clsName: type
        }).pipe(
            switchMap(res => {
                if(!res.success){ this.message.error(res.message); return of([]) }
                let list;
                let newList;
                if ( ['CustomerSourceEnum'].some(item => type === item) ) {
                    list = JSON.parse(JSON.stringify(res.data).replace(/msg/g, 'label').replace(/name/g, 'value')) || [];
                    list.forEach((item, index) => {
                        item.value = item.value || index;
                    })
                }
                if ( ['CustomerIndustryEnum', 'AuthTypeEnum', 'CustomerLevelEnum', 'CompanySizeEnum', 'CustomerTagEnum'].some(item => type === item) ) {
                    list = res.data.map((v, index) => {
                        return {
                            name: v.msg,
                            value: v.code || index
                        }
                    })
                }
                newList = this.dataCenter[type] = list || [];
                if (type === 'CustomerLevelEnum') {
                    newList = this.dataCenter[type] = getSmallObjectString({
                        arr1: this.dataCenter[type],
                        arr2: ['S'],
                        key: 'value'
                    })
                }
                if (type === '') {
                    newList = this.dataCenter[type] = getSmallObjectString({
                        arr1: this.dataCenter[type],
                        arr2: ['S'],
                        key: 'value'
                    })
                }
                return of(newList);
            })
        )
    }
}
