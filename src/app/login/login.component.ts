import { LoginService } from './login.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  logo = 'assets/img/bluechip.jpg'
  color = `radial-gradient( #ffffff, #005eba)`;
  fontColor = '#005eba';
  customerPartyId;
  private cookieValue: string;

  loginForm: FormGroup = this.formBuilder.group({
    'username': ['', Validators.required],
    'password': ['', Validators.required]
  })

  constructor(
    public router: Router,
    public http: HttpClient,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private routeActivated: ActivatedRoute,
    private cookie: CookieService
  ) { }

  ngOnInit(): void {
    this.customerPartyId = this.routeActivated.snapshot.queryParamMap.get('customerPartyId');
    if (localStorage.getItem('isLogin')) {
      this.router.navigate(['/dashboard']);
    }
    else {
      if (this.customerPartyId != null) {
        localStorage.setItem('customerPartyId', this.customerPartyId);
      }
      localStorage.setItem('logo', this.logo);
      localStorage.setItem('fontColor', this.fontColor);
      this.getLoginAppearance();
    }
  }

  userLogin(): void {
    console.log(this.loginForm.value);
    this.loginService.login(this.loginForm.value).subscribe((response) => {
      console.log(response);
      localStorage.setItem("token", response['data']['authenticationToken']['token']);
      localStorage.setItem("isLogin", "true");
      this.router.navigate(['/dashboard']);
    })

  }

  getLoginAppearance(): void {

    let customerData = { "customerPartyId": this.customerPartyId };

    this.loginService.loginAppearance(customerData).subscribe((response: HttpResponse<any>) => {

      if (response['data']) {
        if (response['data']['partyIdentifier'] == 'jma') {
          this.logo = response['data']['logoImageUrl'];
          this.color = `radial-gradient( #ffffff, #007d83)`;
          this.fontColor = '#007d83';
        }
        else if (response['data']['partyIdentifier'] == 'dw') {
          this.logo = response['data']['logoImageUrl'];
          this.color = `radial-gradient( #ffffff, #0a4595)`;
          this.fontColor = '#0a4595';
        }
        else {
          this.logo = 'assets/img/bluechip.jpg';
          this.color = `radial-gradient( #ffffff, #005eba)`;
          this.fontColor = '#005eba';
        }
        localStorage.setItem('logo', this.logo);
        localStorage.setItem('fontColor', this.fontColor);
      }
    })

  }

}
