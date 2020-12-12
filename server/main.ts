import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import * as path from 'path';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as compression from 'compression';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
    console.log('开始启动环境 ====》', process.env.NODE_ENV);
    const server = express();
    const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(server));
    app.use(compression());
    app.useStaticAssets(path.resolve('./dist/angular'));
    app.useStaticAssets(path.resolve('./upload'));
    app.set('etag', false);
    app.enableCors();
    await app.init();
    http.createServer(server).listen(8002);
    if (process.env.NODE_ENV === 'production') {
        https.createServer({
            // key: fs.readFileSync(path.resolve('./static/ssl/zugeliang.com.key')),
            // cert: fs.readFileSync(path.resolve('./static/ssl/zugeliang.com.crt')),
        }, server).listen(8002);
    }
}

bootstrap();
