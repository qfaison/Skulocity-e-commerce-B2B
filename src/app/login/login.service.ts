import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  loginAppearance(customerData) {
    return this.http.post('skulocity/api/v1/public/ecommerce/getCustomerConfiguration', customerData, { observe: 'response' });
  }

  login(userData) {
    return this.http.post('skulocity/api/v1/login', userData);
  }

  logout() {
    return this.http.post('skulocity/api/v1/logout', {});
  }
}
