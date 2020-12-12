import {HttpService, Injectable} from '@nestjs/common';
import {Observable, of} from "rxjs";
import {AxiosResponse} from "axios";
import * as qiniu from 'qiniu';
import * as path from 'path';
import * as fs from 'fs';
import * as qs from 'qs';
import { catchError, switchMap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { ApiConfig, ApiReqConfig } from '../interface/http.interface';
import { ConfigService } from '@nestjs/config';
// 基础service---不允许调用其他除config外的service
@Injectable()
export class ApiService {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
        private readonly messageService: MessageService
    ) {}

    handerError(postInfo, err: any = {}, user?: string): Observable<any> {
        const status = err.response && err.response.status;
        const response = err.response && err.response.data;
        const messageConfig = {
             ...postInfo,
            status: status,
            badRequestBack: response,
            user: user || ''
        };
        // this.messageService.$errorWarn(messageConfig,  status).subscribe(res => {
        //     console.log('错误信息---》', new Date(), JSON.stringify(postInfo));
        //     console.log('错误信息---》', new Date(), JSON.stringify(response || err));
        //     console.log('机器人信息---》', new Date(), JSON.stringify(res.data));
        // });
        return of(err)
    }

    getRequestConfig(request, opt: any = {}): ApiReqConfig{
        const api = opt.server || request.headers['x-api'] || request.headers['X-Api'] || '';
        let serverUrl = api ? this.configService.get(api.toUpperCase()) : '';
        /**
         * 发新版本。换服务器地址。prod的路径改过。有些有缓存的就拿不到新路径。暂时兼容 后续会删除以下代码块
         */
        let url = serverUrl +
            ( opt.url || request.headers['x-url'] || request.headers['X-Url'] || request.headers['X-Code'] || request.headers['x-code']);
        const query = opt.query || request.query;
        if (query && Object.keys(query).length) {
            const arrString = Object.keys(query).map(key => key + '=' + encodeURIComponent(query[key])).join('&');
            url += '?' + arrString;
        }
        const headers = opt.headers || {
            'X-Auth-Token': request.headers['x-auth-token'] || request.headers['X-Auth-Token'] || 'RdZ5X60QSt4YT4+YCFVDCA=='
        };
        const userName = request.headers ? (request.headers['x-user'] || request.headers['X-User'] || '') : '';
        return { url, headers, userName }
    }

    $url(opt): Observable<AxiosResponse<any>> {
        let url = opt.url;
        if (opt.query) {
            const arrString = Object.keys(opt.query).map(key => key + '=' + encodeURIComponent(opt.query[key])).join('&');
            url += '?' + arrString;
        }
        const options = {
            url: url,
            method: 'get',
            headers: opt.headers
        };
        return this.httpService.get(url, {
            headers: opt.headers
        }).pipe(catchError(err => this.handerError(options, err)));
    }

    $get(request, opt?: ApiConfig): Observable<AxiosResponse<any>> {
        const reqInfo = this.getRequestConfig(request, opt);
        const options = {
            url: reqInfo.url,
            method: 'get',
            headers: reqInfo.headers
        };
        return this.httpService.get(reqInfo.url, {
            headers: reqInfo.headers
        }).pipe(catchError((err) => this.handerError(options, err, reqInfo.userName)));
    }
    $post(request, params, opt?: ApiConfig): Observable<AxiosResponse<any>> {
        const reqInfo = this.getRequestConfig(request, opt);
        const options = {
            url: reqInfo.url,
            params,
            method: 'post',
            headers: reqInfo.headers
        };
        return this.httpService.post( reqInfo.url, params, {
            headers: reqInfo.headers
        }).pipe(catchError((err) => this.handerError(options, err, reqInfo.userName)));
    }
    $put(request, params, opt?: ApiConfig): Observable<AxiosResponse<any>> {
        const reqInfo = this.getRequestConfig(request, opt);
        const options = {
            url: reqInfo.url,
            params: params,
            method: 'put',
            headers: reqInfo.headers
        };
        return this.httpService.put(reqInfo.url, params, {
            headers: reqInfo.headers
        }).pipe(catchError((err) => this.handerError(options, err, reqInfo.userName)));
    }
    $delete(request, opt?: ApiConfig): Observable<AxiosResponse<any>> {
        const reqInfo = this.getRequestConfig(request, opt);
        const options = {
            url: reqInfo.url,
            method: 'get',
            headers: reqInfo.headers
        };
        return this.httpService.delete(reqInfo.url, {
            headers: reqInfo.headers
        }).pipe(catchError((err) => this.handerError(options, err, reqInfo.userName)));
    }
    $form(request, params, files, opt?: ApiConfig): Observable<AxiosResponse<any>> {
        const reqInfo = this.getRequestConfig(request, opt);
        let formData = {};
        if (Object.keys(params).length) {
            for (const paramsKey in params) {
                if (Object.prototype.hasOwnProperty.call(params, paramsKey)) {
                    formData[paramsKey] = params[paramsKey];
                }
            }
        }
        if (files) {
            for (const file of files) {
                formData[file.fieldname] = {
                    value: fs.createReadStream(file.path),
                    options: {
                        filename: file.filename
                    }
                };
            }
        }
        const options = {
            url: reqInfo.url,
            method: 'post',
            params: qs.stringify(formData),
            headers: reqInfo.headers
        };
        return this.httpService.post(reqInfo.url, qs.stringify(formData), {
            headers: reqInfo.headers
        }).pipe(catchError((err) => this.handerError(options, err, reqInfo.userName)));
    }

    async $qiniu(file) {
        const ACCESS_KEY = '_ioX8mMk5AKI62zE9iw2fxF1tuzg87UDI5D6Ldf0';
        const SECRET_KEY = '6MD06XdPEb9Iw-vd8GORZhpTcsiNmStAWOHNLOiI';
        const formatZero = (str) => ('00' + str).substr((str + '').length);
        const _uploadFile = async (localFile, key): Promise<{err, ret}> => {
            const putPolicy = new qiniu.rs.PutPolicy({
                scope: 'zgl20181208',
                returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
            });
            const token = putPolicy.uploadToken(new qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY));
            const formUploader = new qiniu.form_up.FormUploader(new qiniu.conf.Config({
                zone: qiniu.zone.Zone_z0,
                useHttpsDomain: true,
                useCdnDomain: true
            }));
            const putExtra = new qiniu.form_up.PutExtra();
            return new Promise(resolve => {
                formUploader.putFile(token, key, localFile, putExtra, function (err, ret) {
                     return resolve({
                        err: err,
                        ret: ret
                    });
                });
            })
        };
        let res;
        const date = new Date();
        const str = date.getFullYear() + formatZero(date.getMonth() + 1) + formatZero(date.getDate());
        const fileType = file.originalname.split('.');
        const retPath = path.join(str + '/', file.filename + ( fileType.length > 1 ? '.' + fileType[fileType.length - 1] : ''));
        const { ret, err } = await _uploadFile(file.path, retPath);
        fs.unlink(file.path, function () {});
        if (ret) {
            const resData = ret || {};
            resData.fullUrl = 'https://static2.zugeliang.com/' + resData.key;
            res = {
                code: 0,
                object: resData
            };
        } else {
            res = {
                code: 50017,
                msg: JSON.stringify(err)
            };
        }
        return res;
    }

}
