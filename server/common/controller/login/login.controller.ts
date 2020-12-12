import { Body, Controller, Get, Inject, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { ApiService } from '../../service/api.service';
import { ReadWriteService } from '../../service/read-write.service';

@Controller('api')
export class LoginController {

    constructor(
        @Inject(ApiService) private readonly api: ApiService,
        private readonly rw: ReadWriteService
    ) {}

    @Get('login')
    async bossGet(@Req() request: Request) {
        const res = await this.api.$get(request).toPromise();
        return res && res.data || res;
    }

    @Post('login')
    async bossPost(@Body() postParams, @Req() request: Request) {
        const res = await this.api.$post(request, postParams).toPromise();
        return res && res.data || res;
    }

}
