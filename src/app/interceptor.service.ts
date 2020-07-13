import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class APIInterceptor implements HttpInterceptor {

    url = 'https://development_bluechip.skulocity.org';

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        // if (localStorage.getItem("token")) {
        //     req = req.clone(
        //         { 
        //             headers: new HttpHeaders({'Authorization': localStorage.getItem('token')}),
        //             url: `${this.url}/${req.url}`
        //         }
        //     );
        // } else {
        //     req = req.clone({ url: `${this.url}/${req.url}`});
        // }   
        // return next.handle(req);


        let headers = new HttpHeaders();
        if(localStorage.getItem('token'))
        {
            headers = headers.append('Authorization', localStorage.getItem('token'));
        }
        headers = headers.append('tenantId', "development_bluechip");
        let request = localStorage.getItem("token");
        if (request) {
            req = req.clone(
                {
                    headers: headers,
                    url: `${this.url}/${req.url}`
                }
            );
        } else {
            req = req.clone(
                {
                    headers:headers,
                    url: `${this.url}/${req.url}`
                }
            );
        }
        return next.handle(req);

    }
}