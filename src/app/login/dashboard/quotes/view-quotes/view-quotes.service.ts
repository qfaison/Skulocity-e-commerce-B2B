import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ViewQuotesService {

  constructor(
    readonly http : HttpClient
  ) { }

  getViewQoute(quoteId){
    return this.http.get('skulocity/api/v1/ecommerce/viewquote?quoteId='+quoteId);
  }
  postViewQoute(itemList){
    return this.http.post('skulocity/api/v1/ecommerce/setQuoteApproval',itemList)
  }

}
