import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(
    private http : HttpClient
  ) { }

  loginAppearance(customerData){
    return this.http.post('skulocity/api/v1/public/ecommerce/getCustomerConfiguration',customerData);
  }

  login(userData){
    return this.http.post('skulocity/api/v1/login', userData);
  }
}
