import { Component, OnInit } from '@angular/core';
import { RequestService } from './request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  requestList;

  constructor(
    readonly service : RequestService,
    readonly router:Router
  ) { }

  ngOnInit() {
    this.getRequestHistory();
  }

  getRequestHistory(){
    this.service.getRequestHistory().subscribe((res)=>{
      this.requestList = res['data']['requestList'];
    })
  }
  viewRequest(custRequestId){
    this.router.navigate(['/dashboard/view-request', custRequestId]);

  }

}
