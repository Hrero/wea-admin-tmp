import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as nodeXlsx from 'node-xlsx';
import * as request from 'request';

@Injectable()
export class ReadWriteService {
    constructor() {
    }

    readJson(filePath): any {
        let bin = fs.readFileSync(path.resolve(filePath));
        if (bin[0] === 0xEF && bin[1] === 0xBB && bin[2] === 0xBF) {
            bin = bin[0] === 0xEF && bin[1] === 0xBB && bin[2] === 0xBF ? bin.slice(3) : bin;
        }
        return JSON.parse(bin.toString('utf-8'));
    }

    writeJson(filePath, data): any {
        return new Promise(resolve => {
            fs.writeFile(path.resolve(filePath), data, function(err) {
                if (err) {
                    resolve({ code: 0, data: null, msg: JSON.stringify(err)})
                }else{
                    resolve({ code: 0, data: null, msg: 'OK'})
                }
            });
        });
    }

    readExcel(file, isDel: boolean = true): Promise<{ msg?: string, data?: Array<any> }> {
        return new Promise((resolve, reject) => {
            try {
                let obj = nodeXlsx.parse(file.path);
                obj.forEach(item => item.data = item.data.filter(v => v.length));
                isDel && fs.unlink(file.path, function () {});
                resolve({data: obj});
            } catch (e) {
                isDel && fs.unlink(file.path, function () {});
                reject({ msg: '解析文件失败' });
            }
        });
    }

    downFile(url, definedName) {
        return new Promise((resolve) => {
            const arr = url.split('/');
            const fileName = definedName || arr[arr.length -1];
            let stream = fs.createWriteStream(path.resolve('./upload/' + fileName));
            request(url).pipe(stream).on("close", function (err) {
                resolve({
                    path: path.resolve('./upload/' + fileName),
                    filename: fileName.split('.')[0],
                    originalname: fileName
                })
            });
        });
    }

    createExcel(fileName, data) {
        let address = path.resolve('./upload/' + fileName);
        const result = require('excel-export').execute({
            stylesXmlFile: address,
            name: "mySheet",
            cols: data.cols,
            rows: data.rows
        });
        return new Buffer(result, 'binary');
    }
    writeFile(name, data) {
        return new Promise(resolve => {
            fs.writeFile(path.resolve('./upload/' + name), data, {encoding: 'binary'}, (err) => {
                if (err) {
                    resolve({
                        code: 50017,
                        data: null,
                        msg: JSON.stringify(err)
                    });
                } else {
                    resolve({
                        code: 0,
                        data: '/' + name,
                        msg: 'ok'
                    });
                }
            });
        });
    }
}
