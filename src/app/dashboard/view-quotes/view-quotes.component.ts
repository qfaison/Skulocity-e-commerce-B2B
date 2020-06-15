import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardServiceService } from '../dashboard-service.service';

@Component({
  selector: 'app-view-quotes',
  templateUrl: './view-quotes.component.html',
  styleUrls: ['./view-quotes.component.scss']
})
export class ViewQuotesComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private dashboardService: DashboardServiceService
  ) { }

  urlSubscriber:any

  ngOnInit(): void {
    this.quoteDetails();
  }

  quoteDetails() : void{
    this.urlSubscriber = this.route.paramMap.subscribe((data: any )=>{
      const quoteId = data.params.quoteId;
      this.dashboardService.getQuoteDetails(quoteId).subscribe((res)=>{
        console.log(res);
      })
    });
  }

}
