import { LoginServiceService } from './login-service.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public router: Router,
    public http: HttpClient,
    private formBuilder : FormBuilder,
    private loginService : LoginServiceService
    ) { }

  color = `radial-gradient( #ffffff, #0a4595)`;
  logo = '../../assets/images/dentwizard.png';
  fontColor = '#0a4595';
  loginForm:FormGroup = this.formBuilder.group({
    'username': ['', Validators.required],
    'password': ['', Validators.required]
  })
  
  ngOnInit(): void {
    this.getLoginAppearance();
  }

  userLogin(){
    console.log(this.loginForm.value);
    // this.loginService.login(this.loginForm.value).subscribe((response)=>{
    //   console.log(response);
    // })
    this.router.navigate(['/dashboard']);
  }

  getLoginAppearance(){

    let customerData = {"customerPartyId": "dw1"};
    // this.loginService.loginAppearance(customerData).subscribe((response)=>{
    // console.log(response);
    // let resp= {
    //               "extendedMessage": null,
    //               "data": {
    //                   "logoImageUrl": "account/logo/61db983d-4ed4-4e6a-ab1f-0139784755bf.png",
    //                   "partyIdentifier": 'jma1',
    //                   "productStoreId": "10150",
    //                   "storeName": "dw1"
    //               },
    //               "error": false,
    //               "message": "SUCCESS",
    //               "timestamp": 1590496300843,
    //               "status": "ACCEPTED"
    //           }
    //       if(resp.data)
    //       {
    //           if(resp.data.partyIdentifier == 'jma1')
    //             {
    //             this.logo = '../../assets/images/JMA Logo_PNG.png';
    //             this.color = `radial-gradient( #ffffff, #007d83)`;
    //             this.fontColor = '#007d83';
    //             }
    //           else if(resp.data.partyIdentifier == 'dw1'){
    //             this.logo = '../../assets/images/dentwizard.png';
    //             this.color = `radial-gradient( #ffffff, #0a4595)`;
    //             this.fontColor = '#0a4595';
    //             }
    //           else{
    //             this.logo = '../../assets/images/bluechip.jpg'
    //             this.color = `radial-gradient( #ffffff, #005eba)`;
    //             this.fontColor = '#005eba';
    //             }
    //       } 
    // })

  }

}