import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderHistoryServiceService } from '../order-history-service.service';
import { FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-order-history',
  templateUrl: './view-order-history.component.html',
  styleUrls: ['./view-order-history.component.scss']
})
export class ViewOrderHistoryComponent implements OnInit {

  viewOrder;
  id: any;
  private sub: any;
  payment;
  placecustomer;
  pdf: any;
  orderItemShipGroups;
  itemSelected:[];
  vierOrder=[];
  color;
  blob;
  isSelectAll:boolean = false;
  selectedItemList = [];
  irm={};
  icm={};

  constructor(
    private route: ActivatedRoute,
    private service : OrderHistoryServiceService
  ) { }

  cancelOrderForm = new FormGroup({
    Comments: new FormControl(''),
    Reason: new FormControl(''),
  });
  ngOnInit() {
    this.color = localStorage.getItem('fontColor');
    this.sub = this.route.params.subscribe(params => {
      this.id =params['ordrid'];
      this.getViewOrder(this.id);
     
    });
  }

  getViewOrder(orderId):void {
    this.service.getViewOrder(orderId).subscribe((res)=>{
     this.placecustomer=res['data'];
      this.viewOrder = res['data']['orderItems'];
      this.payment = res['data']['paymentMethodType'];
      this.orderItemShipGroups=res['data']['orderItemShipGroups']
     
   
    })
  }
  currentPageReload(){
    this.getViewOrder(this.id);

  }
  
  printPdf(orderid){
    this.service.downloadPdf(orderid).subscribe((res: any)=>{
      this.blob = new Blob([res], {type: 'application/pdf'});

      var downloadURL = window.URL.createObjectURL(res);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = "order_"+orderid;
      link.click();
     })
  }
 
  cancelOrder(view){
    
    var key1="irm_"+view.orderItemSeqId;
    var itemReasonMap={};
    itemReasonMap[key1]=this.irm[view.orderItemSeqId];

    var key2="icm_"+view.orderItemSeqId;
    var itemCommentMap={};
    itemCommentMap[key2]=this.icm[view.orderItemSeqId];
    
    var data={
      "orderId":this.id,
      "orderItemSeqId":view.orderItemSeqId
    }
    data['itemReasonMap']=itemReasonMap;
    data['itemCommentMap']=itemCommentMap;

    this.service.cancelOrderItem(data).subscribe((res)=>{
      if(res['data']['responseMessage'] == 'success')
      {
        Swal.fire("Cancelled order item successfully");
        this.getViewOrder(this.id);
      }
    })
  }

  addSelected(order):void {
    order.selected = order.selected ? false : true;    
  }

  addCheckedToCart():void {

    let data = {
      "add_all":"false",
      "orderId":this.id
    }

    let checkedData = "";
    for(let key in this.viewOrder)
    {
      if(this.viewOrder[key]['selected'] == true)
      {
        let seqId = "orderItemSeqId=";
        seqId += this.viewOrder[key]['orderItemSeqId'];
        checkedData += seqId;
      }
    }

    if(checkedData == "")
    {
      Swal.fire('Oops!!','Please select atleast one order','error');
    }
    else
    {
      this.service.addAllToCart(checkedData,data).subscribe((res)=>{
        if(res['data'] == "success")
        {
          Swal.fire("Added to cart successfully")
        }
      })
    }
   
  }

  selectAll(): void {
    this.isSelectAll = !this.isSelectAll;
    let data = {
      "add_all":"true",
      "orderId":this.id
    }
    if(this.isSelectAll == true)
    {
      let orderItemSeqId = '';
      for(let key in this.viewOrder)
      {
        let seqId = "orderItemSeqId=";
        seqId += this.viewOrder[key]['orderItemSeqId'];
        orderItemSeqId += seqId;
      }
      this.service.addAllToCart(orderItemSeqId,data).subscribe((res)=>{
        if(res['data'] == "success")
        {
          Swal.fire("Added to cart successfully")
        }
      })
    }
    else{
      alert("all not selected");
    }

  }

}
