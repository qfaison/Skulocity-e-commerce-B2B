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

  checkoutOptionsCheckoutPage(data){
    return this.http.post('skulocity/api/v1/ecommerce/checkout/checkoutoptions?checkoutpage=shippingaddress',data);
  }

  checkoutOptionsCheckoutPageOptions(data){
    return this.http.post('skulocity/api/v1/ecommerce/checkout/checkoutoptions?checkoutpage=shippingoptions',data);
  }

  checkoutOptionsCheckoutPagePayments(data){
    return this.http.post('skulocity/api/v1/ecommerce/checkout/checkoutoptions?checkoutpage=payment',data);
  }

  review(){
    return this.http.get('skulocity/api/v1/ecommerce/checkout/review');
  }

  taxInfo(){
    return this.http.get('skulocity/api/v1/ecommerce/checkout/taxinfo');
  }

  submitOrder(data){
    return this.http.post('skulocity/api/v1/ecommerce/checkout/processorder?checkoutpage=payment',data);
  }
  
  emptyCart(){
    return this.http.delete('skulocity/api/v1/public/ecommerce/cart/emptycart');
  }

}
