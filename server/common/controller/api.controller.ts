import {
    Controller,
    Get,
    Param,
    Post,
    Req,
    Body,
    Inject,
    UseInterceptors,
    Put,
    Delete,
    UploadedFiles, UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiService } from "../service/api.service";
import { ZglApiInterceptor } from "../interceptor/zgl-api.interceptor";
import { FilesInterceptor } from '@nestjs/platform-express';
import { ReadWriteService } from '../service/read-write.service';
import { MessageService } from '../service/message.service';

@Controller()
@UseInterceptors(new ZglApiInterceptor())
export class ApiController {

    constructor(
        @Inject(ApiService) private readonly api: ApiService,
        private readonly rw: ReadWriteService,
        private readonly messageService: MessageService
    ) {}

    // 兼容下原请求
    @Get('api/loginIn')
    async loginGet(@Req() request: Request) {
        const res = await this.api.$get(request).toPromise();
        return res && res.data || res;
    }

    @Get('api/boss')
    async bossGet(@Req() request: Request) {
        const res = await this.api.$get(request).toPromise();
        return res && res.data || res;
    }

    @Post('api/boss')
    async bossPost(@Body() postParams, @Req() request: Request) {
        const res = await this.api.$post(request, postParams).toPromise();
        if (res && res.data && res.data.code === 0) {
            const reqUrl = request.header('X-Url') || request.header('X-Code');
        }
        return res && res.data || res;
    }

    @Put('api/boss')
    async putPost(@Body() postParams, @Req() request: Request) {
        const res = await this.api.$put(request, postParams).toPromise();
        return res && res.data || res;
    }

    @Delete('api/boss')
    async deleteBoss(@Req() request: Request) {
        const res = await this.api.$delete(request).toPromise();
        return res && res.data || res;
    }

    @Post('api/forms')
    @UseInterceptors(FilesInterceptor('file'))
    async formPost(@Body() postParams, @Req() request: Request, @UploadedFiles() files) {
        const res = await this.api.$form(request, postParams, files).toPromise();
        return res && res.data || res;
    }
}
