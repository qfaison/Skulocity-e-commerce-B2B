import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageServiceService {

  constructor(
    readonly http : HttpClient
  ) { }

  getMessage(condition,partyId,start,viewSize){
    return this.http.get(`skulocity/api/v1/ecommerce/messages/communicationEvent?condition=${condition}&partyId=${partyId}&start=${start}&viewSize=${viewSize}`);
  }  
}
