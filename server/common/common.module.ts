import { HttpModule, Module } from '@nestjs/common';
import { ApiController } from './controller/api.controller';
import { ApiService } from './service/api.service';
import { ReadWriteService } from './service/read-write.service';
import { MulterModule } from '@nestjs/platform-express';
import { MessageService } from './service/message.service';
import { FormatService } from './service/format.service';
import { MockController } from './controller/mock/mock.controller';
import { LoginController } from './controller/login/login.controller';
import { UploadController } from './controller/upload/upload.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        HttpModule,
        ConfigModule,
        MulterModule.register({
            dest: './upload',
        }),
    ],
    controllers: [
        ApiController,
        MockController,
        LoginController,
        UploadController
    ],
    providers: [
        ApiService,
        ReadWriteService,
        MessageService,
        FormatService
    ],
    exports: [
        ApiService,
        ReadWriteService,
        MessageService,
        FormatService
    ],
})
export class CommonModule {
}
