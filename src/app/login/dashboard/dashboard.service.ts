import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    readonly http : HttpClient
  ) { }

  main(){
    return this.http.post('skulocity/api/v1/public/ecommerce/main',{});
  }

  getMainCatalogId(catalogId){
    return this.http.post('skulocity/api/v1/public/ecommerce/main',catalogId);
  }

  showCart(){
    return this.http.get('skulocity/api/v1/public/ecommerce/cart/showcart');
  }

  logout(){
    return this.http.post('skulocity/api/v1/logout',{});
  }

  checkoutOptions(){
    return this.http.post('skulocity/api/v1/ecommerce/checkout/checkoutoptions',{});
  }

  checkoutOptionsCheckoutPage(){
    return this.http.post('skulocity/api/v1/ecommerce/checkout/checkoutoptions',{});
  }

}
