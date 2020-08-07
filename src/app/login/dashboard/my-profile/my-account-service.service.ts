import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyAccountServiceService {

  constructor(
    private http: HttpClient
  ) { }

  getUserDetails() {
    return this.http.get('skulocity/api/v1/ecommerce/profile/view?show_old=false');
  }

}
