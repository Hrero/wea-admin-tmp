import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FilterService} from '../zgl-service/filter.service';
import {NzMessageService, NzModalRef, NzModalService} from 'ng-zorro-antd';
import {FilterType} from '../zgl-type/filter.type';
import {HttpService} from '../../ng-sevice/http.service';
import {ApiType, NeedConfirmType} from '../zgl-type/api.type';
import {AppImgViewComponent} from '../app-view-image/app-view-image.component';
import * as moment from 'moment';

@Component({
    selector: 'app-zgl-forms',
    templateUrl: './zgl-forms.component.html',
    styleUrls: ['./zgl-forms.component.less']
})
export class ZglFormsComponent implements OnInit, OnChanges {

    public validateForm: FormGroup;
    public uploadUrl;
    public dateShow = null;
    public fileList: Array<any>;
    public apiOnly;
    public submitBtn: Array<any>;
    public isDisabled: boolean;

    @Input() formsCtrl: FilterType[]; // 请详细查看表单字符串的规则FilterType文件。
    @Input() formsData: any; // 传入Object对象，没有数据传入{},如果有数据，键值必须和formsCtrl中的key对应
    @Input() type: string; // type = modal 是弹出框表单
    @Input() warning: string;
    @Input() btn: any;
    @Input() api: ApiType | ApiType []; // 非必须 如果有api,http请求在本组件完成，如果没有，在父组件中完成请求
    @Input() needConfirm: NeedConfirmType[];
    @Output() formsSubmit = new EventEmitter<any>(); // 提供非modal模式下的表单提交响应
    @Output() formsChange = new EventEmitter<any>(); // 提供在非modal模式下，表单内值的监听事件

    constructor(
        private filterService: FilterService,
        private fb: FormBuilder,
        private message: NzMessageService,
        private modal: NzModalRef,
        private https: HttpService,
        private modalService: NzModalService
    ) {
        this.uploadUrl = this.https.uploadUrl;
        this.fileList = [''];
    }

    viewImg(img) {
        this.modalService.create({
            nzWidth: 600,
            nzTitle: '查看图片',
            nzContent: AppImgViewComponent,
            nzComponentParams: {
                imageInfo: img
            },
            nzFooter: null
        });
    }

    delThisFile(index, key, dataType) {
        // 表单中文件上传的删除操作
        if ( this.fileList.length === 1) {
            this.fileList = [''];
        } else {
            this.fileList.splice(index, 1);
        }
        if ( dataType === 'json' ) {
            this.validateForm.get(key).setValue(JSON.stringify(this.fileList));
        } else if (  dataType === 'join' ) {
            this.validateForm.get(key).setValue(this.fileList.join());
        } else {
            this.validateForm.get(key).setValue(this.fileList);
        }
    }

    fileUp(e, key, dataType) {
        // 表单中文件上传操作
        if (e.type === 'success') {
            if (dataType === 'sign') {
                this.validateForm.get(key).setValue(e.file.response.object.fullUrl);
            } else {
                const arr = [...this.fileList];
                if (arr.length === 1 && arr[0] === '') {
                    arr[0] = e.file.response.object.fullUrl;
                } else {
                    arr.push(e.file.response.object.fullUrl);
                }
                this.fileList = [...arr];
                if ( dataType === 'json' ) {
                    this.validateForm.get(key).setValue(JSON.stringify(arr));
                } else if (  dataType === 'join' ) {
                    this.validateForm.get(key).setValue(arr.join());
                } else {
                    this.validateForm.get(key).setValue(arr);
                }
            }
        }
    }

    getSelectData(openStatus: boolean, item) {
        // 表单中select选择框的打开事件响应
        if (openStatus && item.sourceKey && !item.search) {
            item.isLoading = true;
            this.filterService.getFilterData(item.sourceKey).subscribe(res => {
                item.optionList = [...res];
                item.isLoading = false;
            });
        }
    }

    getSearchData(e, item) {
        // 表单中select选择框搜索事件的响应
        if (e && item.search) {
            item.isLoading = true;
            this.filterService.getFilterData(item.sourceKey, e).subscribe(res => {
                item.optionList = res;
                item.isLoading = false;
            });
        }
    }

    submitForApi(e: Event, value, api) {
        e.preventDefault();
        this.submitForm(value, api);
    }

    submitForm(value, api) {
        if (this.isDisabled) {
            return;
        }
        this.isDisabled = true;
        if (this.needConfirm && this.needConfirm.length) {
            const contentInfo = [];
            this.needConfirm.forEach(item => {
                contentInfo.push( item.name + ':<span class="color-red font-sl">' + value[item.key] + '</span>');
            });
            this.modalService.confirm({
                nzTitle: '请再次确认输入信息！',
                nzContent: contentInfo.join('<br>'),
                nzOnOk: () => {
                    this.submit(value, api);
                },
                nzOnCancel: () => {}
            });
        } else {
            this.submit(value, api);
        }
    }

    submit(value, api) {
        // 表单提交
        for (const key in this.validateForm.controls) {
            if (key) {
                this.validateForm.controls[key].markAsDirty();
                this.validateForm.controls[key].updateValueAndValidity();
            }
        }
        const postValue = {...value};
        if (this.formsCtrl) {
            this.formsCtrl.forEach(item => {
                if (item.type === 'date') {
                    const formatDate = item.format
                        ? item.format.substr(0, 10).toUpperCase() + item.format.substr(10)
                        : 'YYYY-MM-DD';
                    postValue[item.key] = item.format === 'long'
                        ? moment(value[item.key]).valueOf()
                        : moment(value[item.key]).format(formatDate);
                }
                if (item.type === 'cascader') {
                    postValue[item.key] = item.format === 'string' ? value[item.key].join('/') : value[item.key];
                }
            });
        }
        if (this.type === 'modal') {
            if (api && Object.keys(api).length) {
                // 如果传入了api信息,请查看ApiType,文件在 ng-component/zgl-type/api.type.ts
                if (api.method && api.method === 'get' ) {
                    this.https.$getInfo(api.url, postValue).subscribe(res => {
                        if (res.code === 0 || res.success) {
                            this.modal.destroy(postValue);
                        }
                    });
                } else if (api.method && api.method === 'url') {
                    this.https.$url(api.url, postValue).subscribe(res => {
                        if (res.code === 0 || res.success) {
                            this.message.success(res.msg);
                            this.modal.destroy(postValue);
                        }
                    });
                } else  {
                    this.https.$postInfo(api.url, postValue).subscribe(res => {
                        if (res.code === 0 || res.success) {
                            this.modal.destroy(postValue);
                        }
                    });
                }
            } else {
                this.modal.destroy(postValue);
            }
        } else {
            // 非modal模式直接返回表单值
            this.formsSubmit.emit(postValue);
        }
        setTimeout(() => {
            this.isDisabled = false;
        }, 2000)
    }

    cancel(e: Event) {
        // 取消的操作
        e.preventDefault();
        if (this.type === 'modal') {
            this.modal.destroy();
        } else {
            this.formsSubmit.emit();
        }
    }

    ngOnInit() {
        // 表达初始化
        this.validateForm = this.fb.group({});
        if (this.formsCtrl) {
            this.formsCtrl.forEach(item => {
                let value = this.formsData ? this.formsData[item.key] : item.default;
                if (item.type === 'date' && value) {
                    value = new Date(this.formsData[item.key]);
                }
                this.validateForm.addControl(
                    item.key,
                    new FormControl(
                        value,
                        item.required ? [Validators.required] : []
                    ));
            });
        }
        if (this.type !== 'modal') {
            this.validateForm.valueChanges.subscribe(val => {
                this.formsChange.emit(val);
            });
        }
        if (Array.isArray(this.api)) {
            if (this.api.length) {
                this.submitBtn = [...this.api];
            }
        } else {
            if (this.api && Object.keys(this.api).length) {
                this.apiOnly = { ...this.api };
            } else {
                this.apiOnly = {};
            }
        }
    }
    ngOnChanges() {
        if (this.validateForm) {
            this.formsCtrl.forEach(item => {
                this.validateForm.controls[item.key].setValue(this.formsData[item.key]);
            });
        }
    }
}
