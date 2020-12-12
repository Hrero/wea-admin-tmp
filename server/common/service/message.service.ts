import { HttpService, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {AxiosResponse} from "axios";
import { ReadWriteService } from './read-write.service';
// 基础service
interface ZglApiWarnConfig {
    operatorName: string | null,
    apiName: string,
    requestParams: Object
}
@Injectable()
export class MessageService {
    private readonly accessToken = {
        technology: '766771ff7fe9bddfc1551b8499076102561506c62299c2bf59fc01a7f968a5ca',
        finance: '85bd8f0d95e5f5abb214132a02ed9b0001115b1bf3f8edc9381c09e0887ec54b',
        test: '4aaf026fe0ef94d6d50d3db5324639e24d7240c67f4e55b222b686406e59e39b',
        error: '2882d0ece8eebac7f1d8bbf5a062c41d5681cceb203c31583ace7d63ff9d7ec0'
    };
    constructor(private readonly httpService: HttpService, private readonly rw: ReadWriteService) {}

    $errorWarn(infoArr: any, errorCode): Observable<AxiosResponse<any>> {
        let pushInfo;
        if (infoArr && Array.isArray(infoArr)) {
            pushInfo = infoArr.map(item => "> " + item + "\n\n").join('');
        } else {
            pushInfo = Object.keys(infoArr).map(key => "> " + key + ':' + JSON.stringify(infoArr[key]) + "\n\n").join('')
        }
        const info = {
            "msgtype": "markdown",
            "markdown": {
                "title": "crm报警",
                "text": "#### crm报错" + (errorCode ? ',错误状态码:' + errorCode : '') + " \n" + pushInfo
            },
            "at": {
                "atMobiles": [],
                "isAtAll": false
            }
        };
        return this.$dingTalkPost('error', info);
    }

    $apiWarn(rebotName, warnInfo: ZglApiWarnConfig): Observable<AxiosResponse<any>>  {
        const nameSpace = this.rw.readJson('./static/zgl-api-json/api-params-name.json');
        const postDetail = Object.keys(warnInfo.requestParams)
            .map(key => "> " + (nameSpace[key] || key) + ':' + warnInfo.requestParams[key] + "\n\n").join('');
        const message = {
            msgtype: 'markdown',
            markdown: {
                "title": "(" + warnInfo.operatorName + ")" + warnInfo.apiName,
                "text": "#### " + warnInfo.operatorName + "进行了操作 --> " + warnInfo.apiName + "  \n" + postDetail
            },
            at: {}
        };
        return this.$dingTalkPost(rebotName, message)
    }

    // 基础服务
    $dingTalkPost(rebotName, message): Observable<AxiosResponse<any>> {
        // 格式 文档链接 https://ding-doc.dingtalk.com/doc#/serverapi2/qf2nxq
        // message {
        //      msgtype:  text / link / markdown / actionCard / feedCard,
        //      at { isAtAll: true / false, atMobiles: Array[string] }
        // }
        // text { content }
        // link { text, title, picUrl, messageUrl }
        // markdown { title, text }
        // actionCard { title, text, hideAvatar, btnOrientation, singleTitle, singleURL, btns }
        // FeedCard { links[ { title, messageURL, picURL } ] }
        return this.httpService.post(
            'https://oapi.dingtalk.com/robot/send?access_token=' + this.accessToken[rebotName],
             message,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }

}
