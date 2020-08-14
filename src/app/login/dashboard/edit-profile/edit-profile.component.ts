import { Component, OnInit } from '@angular/core';
import { MyAccountServiceService } from '../my-profile/my-account-service.service';
import { AppService } from '../../../app-service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  userData;
  emailDataList;
  showData = false;
  addresses;
  states;
  countries;
  color;
  defaultShipAddr;
  data;
  purpose;
  updateEmail: boolean = false;
  updateEmailContactMechId;
  updateEmailContactMechTypeId;
  updateEmailId;
  allowSolicitation;
  addEmail: boolean = false;
  newEmailId;
  newMailAllowSolicitation;
  updatePhone: boolean = false;
  addPhone: boolean = false;
  addPhoneCountryCode;
  addPhoneContactNumber;
  addPhoneAreaCode;
  addPhoneAllowSolicitation;
  editPhone: boolean = false;
  editPhoneAllowSolicitation;
  editPhoneAreaCode;
  editPhoneCountryCode;
  editPhoneContactNumber;
  editContactAllowSolicitation = "Y";
  editContactAreaCode;
  editContactContactMechId;
  editContactContactMechTypeId;
  editContactContactNumber;
  editContactCountryCode;
  addAddress: boolean = false;
  addAddressData;

  constructor(
    readonly service: MyAccountServiceService,
    readonly loaderService: AppService,
    readonly router: Router
  ) { }

  ngOnInit(): void {
    this.userData = {
      "firstName": "",
      "middleName": "",
      "lastName": "",
      "comments": ""
    }

    this.addAddressData = {
      "firstName": "",
      "middleName": "",
      "lastName": "",
      "attnName": "",
      "toName": "",
      "address1": "",
      "address2": "",
      "city": "",
      "countryGeoId": "",
      "stateProvinceGeoId": "",
      "postalCode": "",
      "countryCode": "",
      "areaCode": "",
      "phoneNumber": "",
      "contactMechPurposeTypeId": "SHIPPING_LOCATION"
    }
    this.color = localStorage.getItem('fontColor');
    this.loaderService.showLoader();
    this.getUserDetails();
  }

  getCountries(): void {
    this.service.getCountries().subscribe((res) => {
      this.countries = res['data']['countries'];
      this.states = res['data']['states'];
    })
  }

  selectStates(countryId): void {
    this.service.getStatesByCountry(countryId).subscribe((res) => {
      this.states = res['data']['States'];
    })
  }

  setDefaultAddress(contactMechId): void {
    let data = {
      "productStoreId": this.data['productStoreId'],
      "partyId": this.data['person']['partyId'],
      "defaultShipAddr": contactMechId
    }
    this.service.setDefaultAddress(data).subscribe((res) => {
      if (res['data']['responseMessage'] === "success") {
        this.getUserDetails();
      }
      else {
        Swal.fire('Oops..!!', 'Some error occured', 'error');
      }
    })
  }

  updateAddress(postalAddress): void {
    let data = {
      "address1": postalAddress.address1,
      "address2": postalAddress.address2,
      "city": postalAddress.city,
      "contactMechId": postalAddress.contactMechId,
      "countryGeoId": postalAddress.countryGeoId,
      "postalCode": postalAddress.postalCode,
      "stateProvinceGeoId": postalAddress.stateProvinceGeoId,
      "toName": postalAddress.toName
    }

    this.service.updateAddress(data).subscribe((res) => {
      if (res['data']['responseMessage'] === 'success') {
        Swal.fire(res['data']['successMessage']);
        this.getUserDetails();
      }
      else {
        Swal.fire('Oops..!!', 'Some error occured', 'error');
      }
    })
  }

  deletePurpose(contactMechId, contactMechTypeId, fromDate): void {
    let data = {
      "contactMechId": contactMechId,
      "contactMechPurposeTypeId": contactMechTypeId,
      "fromDate": fromDate
    }
    this.service.deletePurpose(data).subscribe((res) => {
      if (res['data']['responseMessage'] === "success") {
        Swal.fire("Success");
        this.getUserDetails();
      }
      else {
        Swal.fire('Oops..!!', 'Some error occured', 'error');
      }
    })
  }

  deleteAddress(contactMechId): void {

    let data = {
      "contactMechId": contactMechId,
      "partyId": this.data['person']['partyId']
    }
    this.service.deleteAddress(data).subscribe((res) => {
      if (res['data']['responseMessage'] === 'success') {
        Swal.fire("Successfully Deleted");
        this.getUserDetails();
      }
      else {
        Swal.fire('Oops..!!', 'Some error occured', 'error');
      }
    })
  }

  purposeChange(contactMechId, purpose): void {
    let data = {
      "contactMechId": contactMechId,
      "contactMechPurposeTypeId": purpose
    }
    this.service.setPurpose(data).subscribe((res) => {
      if (res['data']['responseMessage']) {
        Swal.fire("Success");
      }
      else {
        Swal.fire('Oops..!!', 'Some error occured', 'error');
      }
    })
  }

  editEmail(contactMechId, contactMechTypeId, email): void {
    this.updateEmail = !this.updateEmail;
    this.updateEmailContactMechId = contactMechId;
    this.updateEmailContactMechTypeId = contactMechTypeId;
    this.updateEmailId = email;
  }

  deleteEmail(contactMechId): void {
    let data = {
      "contactMechId": contactMechId,
      "partyId": this.data['person']['partyId']
    }
    this.service.deleteMail(data).subscribe((res) => {
      if (res['data']['responseMessage'] === 'success') {
        Swal.fire("Successfully Deleted");
        this.getUserDetails();
      }
      else {
        Swal.fire('Oops..!!', 'Some error occured', 'error');
      }
    })
  }

  updateEmailIdMethod(): void {
    let data = {
      "allowSolicitation": this.allowSolicitation,
      "contactMechId": this.updateEmailContactMechId,
      "contactMechTypeId": this.updateEmailContactMechTypeId,
      "emailAddress": this.updateEmailId,
      "partyId": this.data['person']['partyId']
    }

    if (this.updateEmailId === "") {
      Swal.fire("Email id must not be empty");
    }
    else {
      this.service.updateMail(data).subscribe((res) => {
        if (res['data']['responseMessage'] === 'success') {
          Swal.fire(res['data']['successMessage']);
          this.updateEmail = false;
          this.getUserDetails();
        }
        else {
          Swal.fire('Oops..!!', 'Some error occured', 'error');
        }
      })
    }

  }

  cancelUpdateEmail(): void {
    this.updateEmail = false;
    this.addEmail = false;
  }

  addNewEmail(): void {

    let data = {
      "emailAddress": this.newEmailId,
      "allowSolicitation": this.newMailAllowSolicitation,
      "partyId": this.data['person']['partyId']
    }

    if (this.newEmailId === "") {
      Swal.fire('Email id must not be empty');
    }
    else {
      this.service.addNewMail(data).subscribe((res) => {
        if (res['data']['responseMessage'] === 'success') {
          Swal.fire(res['data']['successMessage']);
          this.updateEmail = false;
          this.addEmail = false;
          this.getUserDetails();
        }
        else {
          Swal.fire('Oops..!!', 'Some error occured', 'error');
        }
      })
    }

  }

  addMailScreen(): void {
    this.updateEmail = false;
    this.addEmail = true;
  }

  addNewPhoneScreen(): void {
    this.addPhone = true;
  }

  addPhoneNumber(): void {
    let data = {
      "countryCode": this.addPhoneCountryCode,
      "areaCode": this.addPhoneAreaCode,
      "contactNumber": this.addPhoneContactNumber,
      "allowSolicitation": this.addPhoneAllowSolicitation
    }
    if (this.addPhoneContactNumber === "") {
      Swal.fire('Contact no. must not be empty');
    }
    else {
      this.service.addNewContact(data).subscribe((res) => {
        if (res['data']['responseMessage'] === 'success') {
          Swal.fire(res['data']['successMessage']);
          this.updatePhone = false;
          this.addPhone = false;
          this.getUserDetails();
        }
        else {
          Swal.fire('Oops..!!', 'Some error occured', 'error');
        }
      })
    }

  }

  editPhoneScreen(contactMechId, contactMechTypeId, tnAreaCode, tnCountryCode, tnContactNumber): void {
    this.editPhone = true;
    this.editContactAreaCode = tnAreaCode;
    this.editContactContactMechId = contactMechId;
    this.editContactContactMechTypeId = contactMechTypeId;
    this.editContactContactNumber = tnContactNumber;
    this.editContactCountryCode = tnCountryCode;
  }

  editPhoneCancel(): void {
    this.editPhone = false;
    this.addPhone = false;
  }

  editPhoneNumber(): void {
    let data = {
      "allowSolicitation": this.editContactAllowSolicitation,
      "areaCode": this.editContactAreaCode,
      "contactMechId": this.editContactContactMechId,
      "contactMechTypeId": this.editContactContactMechTypeId,
      "contactNumber": this.editContactContactNumber,
      "countryCode": this.editContactCountryCode
    }

    if (this.editContactContactNumber === "") {
      Swal.fire('Contact no. must not be empty');
    }
    else {
      this.service.editContact(data).subscribe((res) => {
        if (res['data']['responseMessage'] === 'success') {
          Swal.fire(res['data']['successMessage']);
          this.editPhone = false;
          this.addPhone = false;
          this.getUserDetails();
        }
        else {
          Swal.fire('Oops..!!', 'Some error occured', 'error');
        }
      })
    }
  }

  deletePhoneNumber(contactMechId): void {
    let data = {
      "contactMechId": contactMechId,
      "partyId": this.data['person']['partyId']
    }
    this.service.deleteContact(data).subscribe((res) => {
      if (res['data']['responseMessage'] === 'success') {
        Swal.fire("Deleted Successfully");
        this.getUserDetails();
      }
      else {
        Swal.fire('Oops..!!', 'Some error occured', 'error');
      }
    })

  }

  getUserDetails(): void {
    this.service.getUserDetails().subscribe((res) => {
      if (res) {
        console.log(res);
        this.data = res['data'];
        this.userData = res['data']['person'];
        this.emailDataList = res['data']['partyAndContactMechList'];
        this.addresses = res['data']['partyContactMechValueMaps'];
        this.defaultShipAddr = res['data']['profiledefs']['defaultShipAddr'];
        if (this.userData && this.emailDataList) {
          this.loaderService.hideLoader();
          this.showData = true;
          this.getCountries();
        }
      }

    })
  }

  addNewAddressScreen(): void {
    this.addAddress = true;
  }

  closeAddAddress(): void {
    this.addAddress = false;
  }

  addAddressMethod(): void {
    this.service.addNewAddress(this.addAddressData).subscribe((res) => {
      if (res['data']['responseMessage'] === 'success') {
        Swal.fire(res['data']['successMessage']);
        this.addAddress = false;
        this.getUserDetails();
      }
      else {
        Swal.fire('Oops..!!', 'Some error occured', 'error');
      }
    })
  }



  editGeneralInformation(): void {
    let data = {
      "comments": this.userData.comments,
      "firstName": this.userData.firstName,
      "lastName": this.userData.lastName,
      "middleName": this.userData.middleName,
      "partyId": this.data['person']['partyId'],
    }
    if (this.userData.firstName == "") {
      Swal.fire("First Name must not be empty");
    }
    else if (this.userData.lastNameName == "") {
      Swal.fire("Last Name must not be empty");
    }
    else {
      this.service.editGeneralDetails(data).subscribe((res) => {
        if (res['data']['responseMessage'] === 'success') {
          Swal.fire("Updated Successfully");
          this.router.navigate(['/my-account']);
        }
        else {
          Swal.fire('Oops..!!', 'Some error occured', 'error');
        }
      })
    }

  }


}
