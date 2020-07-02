import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ViewRequestService {

  constructor(
    private http : HttpClient
  ) { }

  getViewRequest(custRequestId){
    return this.http.get('skulocity/api/v1/ecommerce/shoppinglist/listrequests?custRequestId='+custRequestId);
  }

}
