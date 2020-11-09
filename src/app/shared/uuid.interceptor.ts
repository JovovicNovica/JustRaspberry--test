import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class UuidInterceptor implements HttpInterceptor {
  private candidatUuid: string;

  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.candidatUuid = 'a43e3fc0-b9d4-455c-b04c-8523c75ef25a';

    const headers = new HttpHeaders({
      candidatUuid: this.candidatUuid,
    });

    const clone = request.clone({
      headers,
    });

    return next.handle(clone);
  }
}
