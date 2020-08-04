import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateUserServiceService {

  constructor(
    private http: HttpClient
  ) { }

  getCountries() {
    return this.http.get('skulocity/api/v1/public/ecommerce/countries');
  }

  getStatesByCountry(countryId) {
    return this.http.get('skulocity/api/v1/public/ecommerce/state?defaultCountryGeoId='+countryId);
  }

  createUser(data) {
    return this.http.post('skulocity/api/v1/public/ecommerce/profile/newUser',data)
  }
}
