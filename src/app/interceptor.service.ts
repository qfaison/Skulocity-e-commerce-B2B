import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class APIInterceptor implements HttpInterceptor {

    url = 'https://development.skulocity.org';

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        if (localStorage.getItem("token")) {
            req = req.clone(
                { 
                    headers: new HttpHeaders({'Authorization': localStorage.getItem('token')}),
                    url: `${this.url}/${req.url}`
                }
            );
        } else {
            req = req.clone({ url: `${this.url}/${req.url}`});
        }   
        return next.handle(req);
    }
}