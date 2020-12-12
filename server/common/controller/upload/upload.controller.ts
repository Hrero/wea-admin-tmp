import { Controller, Inject, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiService } from '../../service/api.service';
import { ReadWriteService } from '../../service/read-write.service';

@Controller('api')
export class UploadController {

    constructor(
        @Inject(ApiService) private readonly api: ApiService,
        private readonly rw: ReadWriteService
    ) {}

    @Post('upload')
    @UseInterceptors(FilesInterceptor('file'))
    async uploadFile(@UploadedFiles() files) {
        const uploadSuc = [];
        const uploadErr = [];
        let sucNum = 0;
        let errorNum = 0;
        for(let i = 0; i < files.length; i ++ ) {
            let res =  await this.api.$qiniu(files[i]);
            if (res.code === 0) {
                uploadSuc.push(res.object);
                sucNum ++;
            } else {
                uploadErr.push(res.msg);
                errorNum ++;
            }
        }
        const msg = '成功上传' + sucNum + '个图片' + (errorNum ? '上传失败' + errorNum + '个文件!' : '!');
        return {
            code: errorNum ? 50017 : 0,
            object: uploadSuc[0],
            uploadSuc,
            uploadErr,
            msg
        };
    }

    @Post('excel')
    @UseInterceptors(FilesInterceptor('file'))
    async uploadExcel(@UploadedFiles() files) {
        const excelSuc = [];
        const excelErr = [];
        let sucNum = 0;
        let errorNum = 0;
        for(let i = 0; i < files.length; i ++ ) {
            let res =  await this.rw.readExcel(files[i]);
            if (res.msg) {
                excelErr.push(res.msg);
                errorNum ++;
            } else {
                excelSuc.push(res.data);
                sucNum ++;
            }
        }
        return { code: errorNum ? 50017 : 0, excelSuc, excelErr, msg: errorNum ? '解析失败文件数:' + errorNum : 'ok'};
    }
}
