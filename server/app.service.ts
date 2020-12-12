import { Injectable } from '@nestjs/common';
import { ApiService } from './common/service/api.service';

@Injectable()
export class AppService {
    constructor(private readonly api: ApiService) {}
}
