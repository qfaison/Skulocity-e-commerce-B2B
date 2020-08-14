import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { finalize } from "rxjs/operators";
import { AppService } from './app-service';


@Injectable()
export class APIInterceptor implements HttpInterceptor {

    constructor(public loaderService: AppService) { }

    url;

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loaderService.showLoader();

        let headers = new HttpHeaders();
        if (localStorage.getItem('token')) {
            headers = headers.append('Authorization', localStorage.getItem('token'));
        }
        if (localStorage.getItem('tenantId')) {
            headers = headers.append('tenantId', localStorage.getItem('tenantId'));
            this.url =  'https://'+localStorage.getItem('tenantId')+'.skulocity.org';
        }
        else{
            this.url =  'https://'+localStorage.getItem('urlTenant')+'.skulocity.org';
        }
        
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
                    headers: headers,
                    url: `${this.url}/${req.url}`
                }
            );
        }
        return next.handle(req).pipe(
            finalize(() => this.loaderService.hideLoader()));
    }
    
}