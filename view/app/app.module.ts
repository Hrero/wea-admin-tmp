import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { NZ_CONFIG, NZ_I18N, NzConfig, NzMessageService, zh_CN } from 'ng-zorro-antd';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { NzMessageModule } from 'ng-zorro-antd';
import zh from '@angular/common/locales/zh';
import { HttpInterceptorService } from './ng-sevice/http-interceptor.service';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { CountUpModule } from 'ngx-countup';

const ngZorroConfig: NzConfig = {
    modal: {
        nzMaskClosable: false,
        nzCloseOnNavigation: true,

    }
};

registerLocaleData(zh);

@NgModule({
    declarations: [ // 组件
        AppComponent,
    ],
    imports: [ // 模块类
        BrowserModule,
        AppRoutingModule, // 路由
        HttpClientModule,
        BrowserAnimationsModule,
        NgxWebstorageModule.forRoot(),
        NzMessageModule,
        LazyLoadImageModule,
        CountUpModule
    ],
    providers: [
        { provide: NZ_I18N, useValue: zh_CN },
        NzMessageService,
        { provide: NZ_CONFIG, useValue: ngZorroConfig },
        { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA], // 防止渲染出错
    bootstrap: [AppComponent]
})
export class AppModule {
}
