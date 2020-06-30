import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  tab1:boolean=true;
  tab2: boolean=false;
  tab3: boolean=false;
  color: string;

  constructor() { }

  ngOnInit(): void {
    this.color = localStorage.getItem('fontColor');
    this.tab1=true;
  }

  orderSent(){
    this.tab1=false;
    this.tab2=true;
    this.tab3=false;
  }
  orderEntered(){
    this.tab1=true;
    this.tab2=false;
    this.tab3=false;
  }
  downloadAvailable(){
    this.tab1=false;
    this.tab2=false;
    this.tab3=true;
  }

}
