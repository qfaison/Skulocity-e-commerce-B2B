import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app-service';
import { MyAccountServiceService } from './my-account-service.service';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  userData;
  emailDataList;
  showData = false;

  constructor(
    readonly service : MyAccountServiceService,
    readonly loaderService : AppService
  ) { }

  ngOnInit() {
    this.loaderService.showLoader();
    this.getUserDetails();
  }

  getUserDetails(): void {
    this.service.getUserDetails().subscribe((res)=>{
      if(res)
      {
        console.log(res);
        this.userData = res['data']['person'];
        this.emailDataList = res['data']['partyAndContactMechList'];
        if(this.userData && this.emailDataList){
          console.log("123456");
          console.log(this.userData);
          console.log(this.emailDataList);
          this.loaderService.hideLoader();
          this.showData = true;
        }
      }
     
    })
  }

}
