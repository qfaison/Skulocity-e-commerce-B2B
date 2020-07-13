import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {

  constructor(
    readonly http : HttpClient
  ) { }

  getQuotesList(){
    return this.http.get('skulocity/api/v1/ecommerce/findquote');
  }

}
