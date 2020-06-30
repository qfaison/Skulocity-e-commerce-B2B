import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuotesService } from './quotes.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {

  quotesList;

  constructor(
    private service : QuotesService ,private router:Router
  ) { }

  ngOnInit(): void {
    this.getQuotesList();
  }

  ViewQuote(quoteId){
    this.router.navigate(['dashboard/view-quotes', quoteId]);
  }
  getQuotesList():void {
   
    this.service.getQuotesList().subscribe((res)=>{
      this.quotesList = res['data'];
    
   
    })
  }

}
