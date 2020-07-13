import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class OrderHistoryServiceService {

  httpOptions = {
    responseType: 'blob' as 'json',
  };

  constructor(
    readonly http : HttpClient
  ) { }

  getOrderHistory(){
    return this.http.get('skulocity/api/v1/ecommerce/order/history?start=0&viewSize=10');
  }

  getViewOrder(orderId){
    return this.http.get('skulocity/api/v1/ecommerce/order/status?orderId='+orderId);
  }
  
  downloadPdf(orderId){
    return this.http.get('skulocity/api/v1/ecommerce/order/order/pdf?orderId='+orderId, this.httpOptions);
  }

  addAllToCart(orderItemSeqId,data){
    return this.http.post('skulocity/api/v1/ecommerce/addToCartFromOrder?'+orderItemSeqId,data);
  }

  addAllCart(orderItemSeqId,data){
    return this.http.post('skulocity/api/v1/ecommerce/addToCartFromOrder?'+orderItemSeqId,data);
  }

  cancelOrderItem(data){
    return this.http.post('skulocity/api/v1/ecommerce/cancelOrderItem',data);
  }

  downloadPdfInvoice(invoiceId){
    return this.http.get('skulocity/api/v1/ecommerce/order/invoice/pdf?invoiceId='+invoiceId, this.httpOptions);
  }
}
