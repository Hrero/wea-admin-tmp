import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import {LocalService} from './local.service';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';
import MD5 from 'js-md5';
import {StateService} from './state.service';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    private baseUrl = environment.url;
    private bossUrl = environment.url + '/api/boss';
    private dubboUrl = environment.url;
    private formUrl = environment.url + '/api/forms';
    private loginUrl =  environment.url + '/api/loginIn';
    private toLogin = environment.url + '/api/login'
    public uploadUrl =  environment.uploadUrl;
    constructor(
        private http: HttpClient,
        private local: LocalService,
        private state: StateService,
        private message: NzMessageService
    ) {
    }

    private handleError = (error: HttpErrorResponse) => {
        console.log('error: ', error);
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            this.message.error(JSON.stringify(error.error));
            console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
        }
        throwError('Something bad happened; please try again later.');
        return of({ code: 88888, data: null, msg: '请求异常！' })
    }

    getToken() {
        return this.local.getLocal('token') || this.state.loginToken || ''
    }

    paramsFormat(params) {
        Object.keys(params).forEach(keyName => {
            if (params[keyName] === undefined || params[keyName] === null) {
                delete params[keyName];
            }
            if (typeof params[keyName] === 'number' && params[keyName] !== params[keyName] ) {
                delete params[keyName];
            }
        });
        return params;
    }

    $get(url: string, api: string, params?: any, isLogin?: boolean): Observable<any> {
        let bossUrl = isLogin ? this.toLogin : this.bossUrl;
        if (params && Object.keys(params).length > 0) {
            params = this.paramsFormat(params);
            const arrString = Object.keys(params).map(key => key + '=' + encodeURIComponent(params[key])).join('&');
            bossUrl += '?' + arrString;
        }
        const myHeaders: HttpHeaders = new HttpHeaders({
            'X-Url': url,
            'X-Api': api,
            'X-Auth-Token': this.getToken(),
            'X-User': ( this.state.userInfo && this.state.userInfo.username && encodeURIComponent(this.state.userInfo.username)) || ''
        });
        return this.http.get(bossUrl, {
            headers: myHeaders
        }).pipe(
            catchError(this.handleError)
        );
    }

    $getInfo(url: string,  params?: any): Observable<any> {
        let bossUrl = this.baseUrl + url;
        if (params && Object.keys(params).length > 0) {
            params = this.paramsFormat(params);
            const arrString = Object.keys(params).map(key => key + '=' + encodeURIComponent(params[key])).join('&');
            bossUrl += '?' + arrString;
        }
        const myHeaders: HttpHeaders = new HttpHeaders({
            'X-Auth-Token': this.getToken(),
            'X-User': ( this.state.userInfo && this.state.userInfo.username && encodeURIComponent(this.state.userInfo.username)) || ''
        });
        return this.http.get(bossUrl, {
            headers: myHeaders
        }).pipe(
            catchError(this.handleError)
        );
    }

    $postInfo(url: string, params?: any): Observable<any> {
        let bossUrl = this.baseUrl + url;
        const myHeaders: HttpHeaders = new HttpHeaders(
            {
                'X-Auth-Token': this.getToken(),
                'X-User': ( this.state.userInfo && this.state.userInfo.username && encodeURIComponent(this.state.userInfo.username)) || ''
            }
        );
        if (params && Object.keys(params).length > 0) {
            params = this.paramsFormat(params);
        }
        return this.http.post(bossUrl, params || {}, {
            headers: myHeaders
        }).pipe(
            catchError(this.handleError)
        );
    }

    $post(url: string, api: string, params?: any, isLogin?: boolean): Observable<any> {
        let bossUrl = isLogin ? this.toLogin : this.bossUrl;
        const myHeaders: HttpHeaders = new HttpHeaders(
            {
                'X-Url': url,
                'X-Api': api,
                'X-Auth-Token': this.getToken(),
                'X-User': ( this.state.userInfo && this.state.userInfo.username && encodeURIComponent(this.state.userInfo.username)) || ''
            }
        );
        if (params && Object.keys(params).length > 0) {
            params = this.paramsFormat(params);
        }
        return this.http.post(this.bossUrl, params || {}, {
            headers: myHeaders
        }).pipe(
            catchError(this.handleError)
        );
    }

    $del(url: string, api: string, params?: any): Observable<any> {
        const myHeaders: HttpHeaders = new HttpHeaders(
            {
                'X-Code': url,
                'X-Api': api,
                'X-Auth-Token': this.getToken(),
                'X-User': ( this.state.userInfo && this.state.userInfo.username && encodeURIComponent(this.state.userInfo.username)) || ''
            }
        );
        if (params && Object.keys(params).length > 0) {
            params = this.paramsFormat(params);
        }
        return this.http.delete(this.bossUrl, {
            headers: myHeaders,
            params: params || {}
        }).pipe(
            catchError(this.handleError)
        );
    }

    $put(url: string, api: string, params?: any): Observable<any> {
        const myHeaders: HttpHeaders = new HttpHeaders(
            {
                'X-Code': url,
                'X-Api': api,
                'X-Auth-Token': this.getToken(),
                'X-User': ( this.state.userInfo && this.state.userInfo.username && encodeURIComponent(this.state.userInfo.username)) || ''
            }
        );
        if (params && Object.keys(params).length > 0) {
            params = this.paramsFormat(params);
        }
        return this.http.put(this.bossUrl, params || {}, {
            headers: myHeaders
        }).pipe(
            catchError(this.handleError)
        );
    }

    $form(url: string, api: string, params?: any): Observable<any> {
        const myHeaders: HttpHeaders = new HttpHeaders(
            {
                'X-Code': url,
                'X-Api': api,
                'X-Auth-Token': this.getToken(),
                'X-User': ( this.state.userInfo && this.state.userInfo.username && encodeURIComponent(this.state.userInfo.username)) || ''
            }
        );
        if (params && Object.keys(params).length > 0) {
            params = this.paramsFormat(params);
        }
        return this.http.post(this.formUrl, params || {}, {
            headers: myHeaders
        }).pipe(
            catchError(this.handleError)
        );
    }

    // 专门用于需要node服务器进行数据处理的接口
    $url(url: string, params?: any): Observable<any> {
        const myHeaders: HttpHeaders = new HttpHeaders(
            {
                'X-Auth-Token': this.getToken(),
                'X-User': ( this.state.userInfo && this.state.userInfo.username && encodeURIComponent(this.state.userInfo.username)) || ''
            }
        );
        if (params && Object.keys(params).length > 0) {
            params = this.paramsFormat(params);
        }
        return this.http.post(this.baseUrl + url, params || {}, {
            headers: myHeaders
        }).pipe(
            catchError(this.handleError)
        );
    }

    $downLoad(url: string, params?: any): Observable<any> {
        let downUrl = url;
        if (params && Object.keys(params).length > 0) {
            params = this.paramsFormat(params);
            const arrString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
            downUrl += '?' + arrString;
        }
        const myHeaders: HttpHeaders = new HttpHeaders({
            'X-Auth-Token': this.getToken(),
            'X-User': (this.state.userInfo && this.state.userInfo.username && encodeURIComponent(this.state.userInfo.username)) || ''
        });
        return this.http.get(this.baseUrl + downUrl, {
            headers: myHeaders
        }).pipe(
            catchError(this.handleError)
        );
    }

    $dubboGet(url: string, params?: any): Observable<any> {
        let dubboUrl = this.dubboUrl;
        let bossUrl = dubboUrl + url;


        if (params && Object.keys(params).length > 0) {
            params = this.paramsFormat(params);
            const arrString = Object.keys(params).map(key => key + '=' + encodeURIComponent(params[key])).join('&');
            bossUrl += '?' + arrString;
        }
        const myHeaders: HttpHeaders = new HttpHeaders({
            'X-Auth-Token': this.getToken(),
            'X-User': ( this.state.userInfo && this.state.userInfo.username && encodeURIComponent(this.state.userInfo.username)) || ''
        });
        return this.http.get(bossUrl, {
            headers: myHeaders
        }).pipe(
            catchError(this.handleError)
        );
    }

}
