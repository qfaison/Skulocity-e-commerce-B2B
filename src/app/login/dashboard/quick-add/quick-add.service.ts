import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuickAddService {

  constructor(
    private http : HttpClient
  ) { }

  getSpecialCategory(categoryId){
    return this.http.get('skulocity/api/v1/public/ecommerce/quickadd?categoryId='+categoryId);
  }
}
