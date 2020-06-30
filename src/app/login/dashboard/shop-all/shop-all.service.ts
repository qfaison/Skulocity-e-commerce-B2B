import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopAllService {

  constructor(
    private http : HttpClient
  ) { }

  main(){
    return this.http.post('skulocity/api/v1/public/ecommerce/main',{});
  }

  getMainCatalogId(catalogId){
    return this.http.post('skulocity/api/v1/public/ecommerce/main',catalogId);
  }

  getCatalog(){
    return this.http.get('skulocity/api/v1/public/ecommerce/getAllCategory');
  }

  getSpecialCategory(catalogId){
    return this.http.get('skulocity/api/v1/public/ecommerce/getSpecialCategory?catalogId='+catalogId+'&categoryType=FEATURED')
  }

  getSubCategory(categoryId){
    return this.http.get('skulocity/api/v1/public/ecommerce/product/subcategory?categoryId='+categoryId);
  }

  addProductToCart(productDetails){
    return this.http.post('skulocity/api/v1/public/ecommerce/product/addToCart',productDetails);
  }

  showCart(){
    return this.http.get('skulocity/api/v1/public/ecommerce/cart/showcart');
  }
  
}
