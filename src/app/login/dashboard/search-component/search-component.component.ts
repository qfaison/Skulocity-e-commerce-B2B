import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { SearchServiceService } from './search-service.service';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.scss']
})
export class SearchComponentComponent implements OnInit {

  color;
  sub;
  keyword;
  productList;

  constructor(
    readonly route: ActivatedRoute,
    readonly service: SearchServiceService,
    readonly router: Router
  ) { }

  ngOnInit() {
    this.color = localStorage.getItem('fontColor');
    this.sub = this.route.params.subscribe(params => {
      this.keyword =params['keyword'];
      this.getProducts(this.keyword);
     
    });
  }

  getProducts(keyword): void {
    this.service.search(keyword).subscribe((res)=>{
      this.productList = res['data']['productList'];
    })
  }

  openProduct(productId,isVirtual):void{
    this.router.navigate(['/product-page', productId, isVirtual]);
  }

}
