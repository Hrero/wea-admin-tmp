import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as colors from 'colors-console';
@Injectable()
export class ZglApiInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(map(async data => {
            let responseBack = data;
            try {
                if (data && !data.success) {
                    console.log(colors, 'colorscolorscolors');
                    const req = context.switchToHttp().getRequest();
                    console.error('错误时间---->', new Date());
                    console.log('请求接口---->', "\x1b[40m "+ req.headers['x-url'] +" \x1b[0m", req.headers['x-api']);
                    console.log('用户---->', req.headers['x-user']);
                    console.log('token--->',  req.headers['x-auth-token']);
                    console.log('来源--->',  req.headers['referer']);
                    console.log('query---->', req.query);
                    console.log('params--->', req.params);
                    console.error('错误信息---->', JSON.stringify(data && data.message || data || '').substr(0, 300));
                }
            } catch (e) {
                console.log(e);
            }
            return responseBack;
        }));
    }
}
