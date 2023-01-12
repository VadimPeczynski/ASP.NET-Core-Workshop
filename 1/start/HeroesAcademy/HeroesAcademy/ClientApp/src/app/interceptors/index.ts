import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeadersInterceptor } from './headers.interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true },
];
