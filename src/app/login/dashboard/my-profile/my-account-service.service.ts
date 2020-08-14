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

  getCountries() {
    return this.http.get('skulocity/api/v1/public/ecommerce/countries');
  }
  getStatesByCountry(countryId) {
    return this.http.get('skulocity/api/v1/public/ecommerce/state?defaultCountryGeoId='+countryId);
  }
  setDefaultAddress(data){
    return this.http.post('skulocity/api/v1/ecommerce/profile/setprofiledefault/viewprofile',data);
  }
  setPurpose(data){
    return this.http.post('skulocity/api/v1/parties/contect/purposes',data);
  }
  updateAddress(data){
    return this.http.put('skulocity/api/v1/parties/contect/postaladdress',data);
  }
  deletePurpose(data){
    return this.http.post('skulocity/api/v1/parties/contect/purposes?_method=DELETE',data);
  }
  deleteAddress(data){
    return this.http.delete('skulocity/api/v1/parties/contect/mechs?contactMechId='+data['contactMechId']+'&partyId='+data['partyId']);
  }
  deleteMail(data){
    return this.http.delete('skulocity/api/v1/parties/contect/mechs?contactMechId='+data['contactMechId']+'&partyId='+data['partyId']);
  }
  updateMail(data){
    return this.http.put('skulocity/api/v1/parties/contect/emailaddress',data);
  }
  addNewMail(data){
    return this.http.post('skulocity/api/v1/parties/contect/emailaddress',data);
  }
  addNewContact(data){
    return this.http.post('skulocity/api/v1/parties/contect/telephonenumber',data);
  }
  deletePurposeAddress(data){
    return this.http.delete('skulocity/api/v1/parties/contect/mechs?contactMechId='+data['contactMechId']+'&partyId='+data['partyId']);
  }
  editContact(data){
    return this.http.put('skulocity/api/v1/parties/contect/telephonenumber',data);
  }
  deleteContact(data){
    return this.http.delete('skulocity/api/v1/parties/contect/mechs?contactMechId='+data['contactMechId']+'&partyId='+data['partyId'])
  }
  editGeneralDetails(data){
    return this.http.post('skulocity/api/v1/ecommerce/profile/view',data);
  }
  addNewAddress(data){
    return this.http.post('skulocity/api/v1/parties/contect/postaladdress',data);
  }

}
