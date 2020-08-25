import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {

  private cartNumber: Subject<any> = new Subject();
  cartSubscriber = this.cartNumber.asObservable();

  constructor(
    private http : HttpClient
  ) { }

  search(keyword){
    return this.http.get('skulocity/api/v1/public/ecommerce/product/search?keyword='+keyword);
  }
  
}
