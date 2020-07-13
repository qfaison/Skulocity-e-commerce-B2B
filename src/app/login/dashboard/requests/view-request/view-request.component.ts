import { Component, OnInit } from '@angular/core';
import { ViewRequestService } from './view-request.service';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-view-request',
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.scss']
})
export class ViewRequestComponent implements OnInit {
  id: number;
  readonly sub: any;
  viewRequest;
  viewTableRequest;

  constructor(
    readonly route: ActivatedRoute,
    readonly service : ViewRequestService
  ) { }

  ngOnInit() {
    this.id = this.route['snapshot']['params']['requestId'];
    this.getViewRequest(this.id);
  }
  getViewRequest(custRequestId):void {
    this.service.getViewRequest(custRequestId).subscribe((res)=>{
      this.viewRequest = res['data']['custRequest'];
      this.viewTableRequest = res['data']['productDetails'];
   
    })
  }


}
