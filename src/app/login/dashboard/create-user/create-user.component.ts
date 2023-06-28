import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CreateUserServiceService } from './create-user-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  countries;
  states;
  country;
  errorList = [];
  error: any;

  profileForm = new FormGroup({
    USER_FIRST_NAME: new FormControl(''),
    USER_LAST_NAME: new FormControl(''),
    CUSTOMER_EMAIL: new FormControl(''),
    CUSTOMER_ADDRESS1: new FormControl(''),
    CUSTOMER_ADDRESS2: new FormControl(''),
    CUSTOMER_CITY: new FormControl(''),
    CUSTOMER_POSTAL_CODE: new FormControl(''),
    CUSTOMER_COUNTRY: new FormControl(''),
    CUSTOMER_STATE: new FormControl(''),
    CUSTOMER_HOME_AREA: new FormControl(''),
    CUSTOMER_HOME_CONTACT: new FormControl(''),
    CUSTOMER_HOME_EXT: new FormControl(''),
    PASSWORD: new FormControl(''),
    CONFIRM_PASSWORD: new FormControl(''),
    PASSWORD_HINT: new FormControl(''),
    CUSTOMER_EMAIL_ALLOW_SOL: new FormControl(''),
    TERMS_AND_CONDITIONS: new FormControl(''),
  });


  constructor(
    readonly service : CreateUserServiceService,
    readonly router: Router
  ) { }

  ngOnInit(): void {
    this.getCountries();
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

  checkPassword(): void {
    if (this.profileForm.value['PASSWORD'] != this.profileForm.value['CONFIRM_PASSWORD']) {
      Swal.fire('Oops..!!', 'Password must match', 'error');
    }
  }

  addUser(): void {
    if (!this.profileForm.value['TERMS_AND_CONDITIONS'] || this.profileForm.value['TERMS_AND_CONDITIONS'] === "") {
      Swal.fire('Oops..!!', 'Please agree to the terms and conditions first', 'error');
    }
    else {

      if (this.profileForm.value['PASSWORD'] != this.profileForm.value['CONFIRM_PASSWORD']) {
        Swal.fire('Oops..!!', 'Password must match', 'error');
      }
      else {
        let data = this.profileForm.value;
        delete data['TERMS_AND_CONDITIONS'];
        data['USERNAME'] = this.profileForm.value['CUSTOMER_EMAIL'];

        this.service.createUser(data).subscribe((res) => {
          if (res['data'] === 'success') {
            Swal.fire('User created successfully...!!!');
            this.router.navigate(['login']);
          }
          else {
            if (res['error'] === true) {
              this.error = res['data'];
              for (let key in this.error) {
                const data = this.error[key];
                const isArray = data instanceof Array;
                console.log(isArray); // false

                if (!isArray) {
                  this.errorList.push(this.error[key]['message']);
                }
              }
            }
          }
        })
      }

    }
  }

}