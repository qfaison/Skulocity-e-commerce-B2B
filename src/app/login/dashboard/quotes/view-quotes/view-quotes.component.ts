import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewQuotesService } from './view-quotes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quotes',
  templateUrl: './view-quotes.component.html',
  styleUrls: ['./view-quotes.component.scss']
})
export class ViewQuotesComponent implements OnInit {

  id: number;
  private sub: any;
  viewQuote;
  viewQuoteList;
  postViewRetailResponse;
  quoteItems = [];
  color;

  constructor(
    readonly route: ActivatedRoute,
    readonly service: ViewQuotesService
  ) { }

  ngOnInit() {
    this.color = localStorage.getItem('fontColor');
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['quoteId'];
      this.getQuoteView(this.id);
    });
  }

  getQuoteView(quoteid): void {
    this.service.getViewQoute(quoteid).subscribe((res) => {
      this.viewQuote = res['data']['quoteData'][0];
      this.viewQuoteList = res['data']['quoteData'][0]['quoteItemList'];


    })
  }
  saveRetailView(itemList) {

    for (const c of itemList) {
      const postData = {

        "quoteId": c.quoteId,
        "quoteItemSeqId": c.quoteItemSeqId,
        "productId": c.productId,
        "isApproved": c.quoteApproval.isApproved,
        "comments": c.quoteApproval.comments


      }
      this.quoteItems.push(postData);
    }
    const quoteData = {
      "quoteItemsApprovalList": this.quoteItems
    }

    this.service.postViewQoute(quoteData).subscribe((res) => {
      this.postViewRetailResponse = res['data']['responseMessage'];
      if (this.postViewRetailResponse === "success") {
        Swal.fire("Success");
      }
    }
    )

  }

}
