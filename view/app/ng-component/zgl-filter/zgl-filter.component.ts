import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FilterService } from '../zgl-service/filter.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FilterType } from '../zgl-type/filter.type';
import { NzCascaderOption } from 'ng-zorro-antd';
import { StateService } from '../../ng-sevice/state.service';
import { isEmpty } from 'zgl-utils-js';
import { throwIfEmpty } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
    selector: 'app-zgl-filter',
    templateUrl: './zgl-filter.component.html',
    styleUrls: ['./zgl-filter.component.less']
})
export class ZglFilterComponent implements OnInit {
    public validateForm: FormGroup;
    public hasCheckBox;
    public timeSet = {
        '近7日': [new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000), new Date()],
        '近15日': [new Date(new Date().getTime() - 15 * 24 * 60 * 60 * 1000), new Date()],
        '近30日': [new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000), new Date()],
        '近90日': [new Date(new Date().getTime() - 90 * 24 * 60 * 60 * 1000), new Date()],
    };
    public isMobile;
    public reload;
    public isShowAll;
    public showFilters: FilterType[];
    public sourceSelectOption:any = [];
    @Input() filterList: Array<FilterType>;
    @Output() filterSearch = new EventEmitter<any>();
    public disabledDate = (current: Date): boolean => {
        return current && current.getTime() > Date.now();
    }
    constructor (
        private filterService: FilterService,
        private fb: FormBuilder,
        private state: StateService,
        private message: NzMessageService
    ) {
        this.isMobile = state.checkIsMobile();
        this.isShowAll = !this.isMobile;
    }
    getSelectData(openStatus: boolean, item) {
        if (openStatus && item.sourceKey && !item.search) {
            let data:any = {};
            // 点击销售时去获取部门id
            if(item.sourceKey === "salesmanList") {
                data.deptId  = this.validateForm.value.deptId;
                if(!data.deptId){ this.message.info('请先选择团队'); return}
            }
            item.isLoading = true;
            this.filterService.getFilterData(item.sourceKey, data).subscribe(res => {
                let resBack = res;
                item.optionList = resBack;
                item.isLoading = false;
            });
        }
    }
    // 部门下拉框改变时的逻辑
    selectChange(e, item){
        // 1.实现部门和销售的联动: 部门变动，销售置空
        if(item.key === "deptId") {
            this.validateForm.get('salesId').setValue(null);
            this.showFilters.forEach(item => {
                if(item.key === 'salesId') item.optionList = [];
            })
            // 业务逻辑：兼容销售管理-订单列表 一个部门对应两个销售列表的业务 
            if(this.validateForm.get('salesId2')){
                this.validateForm.get('salesId2').setValue(null);
                this.showFilters.forEach(item => {
                    if(item.key === 'salesId2') item.optionList = [];
                })
            }
        }
    }
    public count = 0;
    getCascaderData(item){
        this.count++;
        console.log('item: ', this.count,item);
    }
    getSearchData(e, item) {
        if (item.search) {
            item.isLoading = true;
            this.filterService.getFilterData(item.sourceKey, e).subscribe(res => {
                item.optionList = res;
                item.isLoading = false;
            });
        }
    }
    onChanges(value) {
        console.log(value, '=====1');
    }
    checkValueSet(value, key) {
        this.validateForm.controls[key].setValue(value);
    }
    submitForm() {
        this.filterSearch.emit(this.validateForm.value);
    }
    reset() {
        this.validateForm.reset();
    }
    resetAll($event: Event) {
        $event.preventDefault();
        this.validateForm = this.fb.group({});
        if (this.filterList) {
            this.filterList.forEach(item => {
                this.validateForm.addControl(item.key, new FormControl(item.default));
            });
        }
        this.filterSearch.emit({});
    }
    isSHowAllFilter(e:Event) {
        e.preventDefault();
        e.stopPropagation();
        this.isShowAll = !this.isShowAll;
        this.showFilters = !this.isShowAll ? this.filterList.filter((item, index) => index < 3) : this.filterList;
        this.resetFilterForm();
    }
    resetFilterForm() {
        this.reload = true;
        this.validateForm = this.fb.group({});
        if (this.showFilters) {
            this.showFilters.forEach(item => {
                if (item.type === 'checkbox') {
                    this.hasCheckBox = true;
                }
                this.validateForm.addControl(item.key, new FormControl(item.default));
                if (item.keys) {
                    this.validateForm.addControl(item.keys, new FormControl(item.default));
                }
            });
            this.reload = false;
        }
    }
    ngOnInit() {
        /**
         * 1.取出数组的有sourceKey那批元素
         * 2.重新组建一个数组
         */
        this.showFilters = !this.isShowAll ? this.filterList.filter((item, index) => index < 3) : this.filterList;
        this.sourceSelectOption = this.showFilters.map(item => {
            return {
                sourceKey: item.sourceKey,
                optionList: item.optionList,
                type: item.type
            }
        })
        this.resetFilterForm();
    }
}
