import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductPageServiceService {

  constructor(
    readonly http : HttpClient
  ) { }

  openProduct(productData){
    return this.http.post('skulocity/api/v1/public/ecommerce/product?_method=GET',productData);
  }

  addProductToCart(productDetails){
    return this.http.post('skulocity/api/v1/public/ecommerce/product/addToCart',productDetails);
  }
}
