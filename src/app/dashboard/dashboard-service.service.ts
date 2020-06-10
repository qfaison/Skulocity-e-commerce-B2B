import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardServiceService {

  constructor(
    private http : HttpClient
  ) { }

  main(data) {
    return this.http.post('skulocity/api/v1/public/ecommerce/main', data);
  }

  getCatalog(catalogId){
    return this.http.get('skulocity/api/v1/public/ecommerce/getAllTypeOfCategory?catalogId='+catalogId)
  }

  getCategory(categoryId){
    return this.http.get('skulocity/api/v1/public/ecommerce/product/subcategory?categoryId='+categoryId)
  }

  quickadd(categoryId){
    return this.http.get('skulocity/api/v1/public/ecommerce/quickadd?categoryId='+categoryId)
  }

  getSpecialCategory(data){
    return this.http.get('skulocity/api/v1/public/ecommerce/getSpecialCategory?catalogId='+data.catalogId+'&categoryType='+data.categoryType)
  }

}
