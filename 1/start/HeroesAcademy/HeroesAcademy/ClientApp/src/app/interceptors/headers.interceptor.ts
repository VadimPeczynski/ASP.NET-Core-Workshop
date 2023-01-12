import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Hello, from interceptor!');
    const headerReq = request.clone({
      headers: request.headers
        .set('Content-Type', 'application/json')
        .set('Authorization', 'my-auth-token'),
    });
    console.log(headerReq);
    return next.handle(headerReq);
  }
}
