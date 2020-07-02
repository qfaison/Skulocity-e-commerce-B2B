import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderHistoryServiceService } from './order-history-service.service';

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
  orderList;
  blob;

  constructor(
    private router:Router,
    private service: OrderHistoryServiceService
  ) { }

  ngOnInit(): void {
    this.color = localStorage.getItem('fontColor');
    this.tab1=true;
    this.getOrderHistory();
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

  getOrderHistory(): void{
    this.service.getOrderHistory().subscribe((res)=>{
      console.log(res);
      this.orderList = res['data']['orderList'];
    })
  }

  viewOrder(custRequestId){
    this.router.navigate(['/dashboard/view-order', custRequestId]);

  }

  downloadPdf(invoiceId): void{
    this.service.downloadPdfInvoice(invoiceId).subscribe((res: any)=>{
      this.blob = new Blob([res], {type: 'application/pdf'});

      var downloadURL = window.URL.createObjectURL(res);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = "order_"+invoiceId;
      link.click();
    })
  }

}
