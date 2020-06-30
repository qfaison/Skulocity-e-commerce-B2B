import { Component, OnInit } from '@angular/core';
import { RequestService } from './request.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  requestList;

  constructor(
    private service : RequestService
  ) { }

  ngOnInit(): void {
    this.getRequestHistory();
  }

  getRequestHistory(){
    this.service.getRequestHistory().subscribe((res)=>{
      this.requestList = res['data']['requestList'];
    })
  }

}
