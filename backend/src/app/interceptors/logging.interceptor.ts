import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;
    const now = Date.now();

    Logger.log(`${method} ${url}`);

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        const { statusCode } = response;
        Logger.log(`${method} ${url} ${statusCode} ${Date.now() - now}ms`);
      }),
      catchError((e) => {
        Logger.error(
          `${method} ${url} ${e.status} ${e.message} ${Date.now() - now}ms`,
        );
        return throwError(() => e);
      }),
    );
  }
}
