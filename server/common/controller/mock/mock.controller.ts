import { Body, Controller, Post } from '@nestjs/common';
import { ReadWriteService } from '../../service/read-write.service';

@Controller('mock')
export class MockController {
    constructor(private readonly rw: ReadWriteService) {

    }
    @Post('data')
    getData(@Body() params) {
        const res = this.rw.readJson('./static/mock-data/' + params.mk + '.json');
        return res;
    }

    @Post('center')
    getCenter(@Body() params) {
        const res = this.rw.readJson('./static/mock-data/' + params.mk + '.json');
        res.result[0].layout = this.rw.readJson('./static/mock-data/layout.json')
        return res;
    }

    @Post('set_price')
    async setPrice(@Body() params) {
        const data = this.rw.readJson('./static/mock-data/hp-price.json')
        if (data.some(item => item.goodsSn === params.goodsSn)) {
             data.forEach(item => {
                 if (item.goodsSn === params.goodsSn) {
                     item = params;
                 }
             })
        } else {
            data.push(params);
        }
        return await this.rw.writeJson('./static/mock-data/hp-price.json', JSON.stringify(data));
    }
}
