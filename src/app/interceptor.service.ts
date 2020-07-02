import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class APIInterceptor implements HttpInterceptor {

    url = 'https://development.skulocity.org';
    //url = 'http://localhost:8080';

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let newHeaders = req.headers;
        if (localStorage.getItem("authenticationToken")) {
            req = req.clone(
                { 
                    headers: new HttpHeaders({'Authorization': localStorage.getItem('authenticationToken')}),
                    url: `${this.url}/${req.url}`
                }
            );
        } else {
            req = req.clone({ url: `${this.url}/${req.url}`});
        }   
        return next.handle(req);
    }
}