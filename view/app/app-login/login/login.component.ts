import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HttpService} from '../../ng-sevice/http.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {NzDrawerService} from 'ng-zorro-antd';
import {LocalService} from '../../ng-sevice/local.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
    validateForm!: FormGroup;
    constructor(
        public router: Router,
        private https: HttpService,
        private local: LocalService,
        private message: NzMessageService,
        private modalService: NzModalService,
        private drawerService: NzDrawerService,
        private fb: FormBuilder
    ) {
    }
    submitForm(): void {
        // tslint:disable-next-line:forin
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
            this.validateForm.controls[i].updateValueAndValidity();
        }
        console.log();
        const { username, password } =  this.validateForm.value;
        if (username === 'eleven' && password === 'admin') {
            this.message.success('登录成功');
            this.local.setLocal('token', 'eleven_token');
            this.local.setLocal('userinfo', {
                flowerName: '十一'
            });
            this.router.navigate(['/content']);
        } else {
            this.message.success('账号密码不对！');
        }
    }
    ngOnInit() {
        console.log(1);
        this.validateForm = this.fb.group({
            username: [null, [Validators.required]],
            password: [null, [Validators.required]]
        });
    }

}
