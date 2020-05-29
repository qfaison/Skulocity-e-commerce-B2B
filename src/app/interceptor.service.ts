import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class APIInterceptor implements HttpInterceptor {

    url = 'http://localhost:8080';

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
           const apiReq = req.clone({ url: `${this.url}/${req.url}`});
        return next.handle(apiReq);
    }
}