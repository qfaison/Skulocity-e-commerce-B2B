import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListServiceService {

  constructor(
    private http : HttpClient
  ) { }


  getShopingList(){
    return this.http.get('skulocity/api/v1/ecommerce/shoppinglist/editShoppingList');
  }
  getCreateNew(productStoreId){
    return this.http.get('skulocity/api/v1/ecommerce/shoppinglist/createemptyshoppinglist?productStoreId='+productStoreId);
  }
  getEditShopingList(shoppingListId){
    return this.http.get('skulocity/api/v1/ecommerce/shoppinglist/editShoppingList?shoppingListId='+shoppingListId);
  }
  UpdateShopingData(UpdateShopingData){
    
    return this.http.post('skulocity/api/v1/ecommerce/shoppinglist/updateshoppinglist',UpdateShopingData)
  }
  getRequestQuotes(shoppingListId){
    return this.http.get('skulocity/api/v1/ecommerce/shoppinglist/createcustrequestfromshoppinglist?shoppingListId='+shoppingListId);
  }
  getCreateNewQuotes(shoppingListId){
    return this.http.get('skulocity/api/v1/ecommerce/shoppinglist/createquotefromshoppinglist?shoppingListId='+shoppingListId);
  }
  addItemShopingList(addItemData){ 
    return this.http.post('skulocity/api/v1/ecommerce/shoppinglist/addItemtoshoppinglist',addItemData)
  }


}
