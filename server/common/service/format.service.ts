import { Injectable } from '@nestjs/common';
import { position } from 'zgl-utils-js';
// 基础service---不允许调用其他service
@Injectable()
export class FormatService {
    constructor() {}

    getAreaName(code) {
        const arr: Array<{ children: any, label: string, value: string, isLeaf?: boolean }> = Array.from(position);
        let newArr = [] as any[];

        arr.forEach(item => {
            item.value = item.label;
        })
        return newArr;
    }

    dateFormat(date: string | number, format: string = 'yyyy-MM-dd hh:mm:ss'): string {
        if (date) {
            const padLeftZero = (str) => {
                return ('00' + str).substr(str.length);
            };
            let $date = new Date(date);
            if (/(y+)/.test(format)) {
                format = format.replace(RegExp.$1, ($date.getFullYear() + '').substr(4 - RegExp.$1.length));
            }
            let dateKey = {
                'M+': $date.getMonth() + 1,
                'd+': $date.getDate(),
                'h+': $date.getHours(),
                'm+': $date.getMinutes(),
                's+': $date.getSeconds()
            };
            for (let key in dateKey) {
                if (new RegExp(`(${key})`).test(format)) {
                    let str = dateKey[key].toString();
                    format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
                }
            }
            return format;
        }
        return ''
    }
    priceFormat(s): string {
        if (/[^0-9\.]/.test(s)) {
            return '0.00';
        }
        s = s.toString().replace(/^(\d*)$/, '$1.');
        s = (s + '00').replace(/(\d*\.\d\d)\d*/, '$1');
        s = s.replace('.', ',');
        const re = /(\d)(\d{3},)/;
        while (re.test(s)) {
            s = s.replace(re, '$1,$2');
        }
        s = s.replace(/,(\d\d)$/, '.$1');
        return s.replace(/^\./, '0.');
    }
    leaseModeFormat(value): string{
        if (value) {
            try {
                const leaseModeInfo = JSON.parse(value);
                if (leaseModeInfo.leaseWay === 5) {
                    if (leaseModeInfo.carefree && Object.keys(leaseModeInfo.carefree).length) {
                        return '无忧购: 无忧购价￥' + leaseModeInfo.carefree.fixedPrice + '<br>'
                            + '保质期:' + leaseModeInfo.carefree.expPeriod + '<br>个月'
                            + '保底价:' + leaseModeInfo.carefree.securityPrice;
                    } else {
                        return '无忧购信息缺失';
                    }
                } else {
                    const unitName = leaseModeInfo.unit === 2 ? '周周付' : leaseModeInfo.unit === 1 ? '日租' : '月租';
                    const unitDesc = leaseModeInfo.unit === 2 ? '周' : leaseModeInfo.unit === 1 ? '天' : '个月';
                    let price;
                    if (leaseModeInfo.periodsPriceCollectStr) {
                        const arr = leaseModeInfo.periodsPriceCollectStr.split(',');
                        let savePrice;
                        const secArr = [];
                        arr.forEach((item, index) => {
                            if (item !== savePrice || !secArr.length) {
                                secArr.push({
                                    start: index + 1,
                                    value: item
                                });
                                savePrice = item;
                            } else {
                                secArr[secArr.length - 1].end = index + 1;
                            }
                        });
                        if (secArr.length === 1) {
                            price = '￥' + this.priceFormat(secArr[0].value);
                        } else {
                            price = secArr
                                .map(v => '￥' + this.priceFormat(v.value) + '(第' + ( v.end ? v.start + '~' + v.end : v.start ) + '期)')
                                .join() + '(阶梯)';
                        }
                    } else {
                        price =  '￥' + this.priceFormat(leaseModeInfo.leasePrice);
                    }
                    return unitName + ':' + price + ''
                        + '周期:' + ( leaseModeInfo.period || leaseModeInfo.leaseMonth )  + unitDesc + ''
                        + '租赁模式:' + ( leaseModeInfo.leaseTagDesc || '到期归还' );
                }
            } catch (e) {
                return '租赁模式解析失败';
            }
        }
        return '没有租赁模式！';
    }
}
