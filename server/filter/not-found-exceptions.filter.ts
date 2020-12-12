import {ArgumentsHost, Catch, ExceptionFilter, HttpException, NotFoundException} from '@nestjs/common';
import * as path from "path";

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        response.setHeader('Cache-Control', 'no-cache');
        response.status(200);
        // response.location('/pages/404');
        response.sendFile(path.resolve('./dist/angular/index.html'));
    }
}
