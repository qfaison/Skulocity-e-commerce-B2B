import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(
    private http : HttpClient
  ) { }

  getRequestHistory(){
    return this.http.get('skulocity/api/v1/ecommerce/shoppinglist/listrequests');
  }
}
