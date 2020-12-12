import {NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

import {LoginComponent} from './login/login.component';
import {
    NzButtonModule, NzFormModule,
    NzGridModule,
    NzIconModule,
    NzInputModule, NzMessageModule,
    NzModalModule,
    NzSpinModule,
    NzDrawerModule,
    NzTabsModule
} from 'ng-zorro-antd';

const routes: Routes = [
    { path: '', component: LoginComponent },
];

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        NzInputModule,
        NzButtonModule,
        NzIconModule,
        NzModalModule,
        NzDrawerModule,
        NzMessageModule,
        NzSpinModule,
        NzTabsModule,
        NzGridModule,
        NzFormModule
    ],
    providers: [], // 需要使用的 Service 都放在这里
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppLoginModule {  // AppLoginModule注入器
}
