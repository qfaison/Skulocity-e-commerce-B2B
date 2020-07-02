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
  private sub: any;
  viewRequest;
  viewTableRequest;

  constructor(
    private route: ActivatedRoute,
    private service : ViewRequestService
  ) { }

  ngOnInit() {
    // this.sub = this.route.params.subscribe(params => {
    //   this.id = params['custRequestId'];
    //   this.getViewRequest(this.id);
     
    // });
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
