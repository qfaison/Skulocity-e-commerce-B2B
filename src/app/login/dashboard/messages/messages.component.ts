import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageServiceService } from './message-service.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  messageList;

  constructor(
    private service : MessageServiceService,
    private router:Router
  ) { }

  ngOnInit(): void {
    let condition = false;
    let partyId = localStorage.getItem("partyId");
    let start = 1;
    let viewSize = 10;
    this.getMessage(condition, partyId, start, viewSize);
  }

  getMessage(condition, partyId, start, viewSize): void {
    this.service.getMessage(condition, partyId, start, viewSize).subscribe((res) => {
      this.messageList = res['data']['list'];
    })
  }
  viewMessage(communicationId) {
    this.router.navigate(['/view-message', communicationId]);
  }

}
