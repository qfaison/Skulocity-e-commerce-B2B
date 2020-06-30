import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewQuotesService } from './view-quotes.service';

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

  constructor(
    private route: ActivatedRoute,
    private service: ViewQuotesService
  ) { }

  ngOnInit() {
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

}
