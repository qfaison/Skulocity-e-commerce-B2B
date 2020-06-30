import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ViewQuotesService {

  constructor(
    private http : HttpClient
  ) { }

  getViewQoute(quoteId){
    return this.http.get('skulocity/api/v1/ecommerce/viewquote?quoteId='+quoteId);
  }

}
