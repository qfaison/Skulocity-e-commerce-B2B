import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardServiceService {

  private cartNumber: Subject<any> = new Subject();
  cartSubscriber = this.cartNumber.asObservable();

  constructor(
    private http : HttpClient
  ) { }


  main(data) {
    return this.http.post('skulocity/api/v1/public/ecommerce/main', data);
  }

  addValueToCart(data): void {
    this.cartNumber.next(data);
  }

  getCatalog(catalogId){
    return this.http.get('skulocity/api/v1/public/ecommerce/getAllTypeOfCategory?catalogId='+catalogId);
  }

  getCategory(categoryId){
    return this.http.get('skulocity/api/v1/public/ecommerce/product/subcategory?categoryId='+categoryId);
  }

  quickadd(categoryId){
    return this.http.get('skulocity/api/v1/public/ecommerce/quickadd?categoryId='+categoryId);
  }

  getSpecialCategory(getSpecialCategoryData){
    return this.http.get('skulocity/api/v1/public/ecommerce/getSpecialCategory?catalogId='+getSpecialCategoryData.catalogId+'&categoryType='+getSpecialCategoryData.categoryType);
  }
 
  addItem(addItemData) {
    return this.http.post('skulocity/api/v1/public/ecommerce/product/addToCart',addItemData);
  }

  getCartDetail() {
    return this.http.get('skulocity/api/v1/public/ecommerce/cart/showcart');
  }

  findQuotes() {
    return this.http.get('skulocity/api/v1/ecommerce/findquote',{headers: new HttpHeaders({'Authorization': localStorage.getItem('authenticationToken')})});
  }

  getQuoteDetails(quoteId) {
    return this.http.get('skulocity/api/v1/ecommerce/viewquote?quoteId='+quoteId,{headers: new HttpHeaders({'Authorization': localStorage.getItem('authenticationToken')})});
  }

}
