import { Component, OnInit } from '@angular/core';
import { QuickAddService } from './quick-add.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quick-add',
  templateUrl: './quick-add.component.html',
  styleUrls: ['./quick-add.component.scss']
})
export class QuickAddComponent implements OnInit {

  quickAddCategory;
  quickAdd: string;
  quantity = [];

  constructor(
    readonly service: QuickAddService,
    readonly route : Router
  ) { }

  ngOnInit() {
    this.quickAdd='CATALOG1_QUICKADD1';
    this.getQuickAdd(this.quickAdd)
  }

  getQuickAdd(quickAdd):void {
   
    this.service.getSpecialCategory(quickAdd).subscribe((res)=>{
      this.quickAddCategory = res['data']['productSummary']['productCategoryMembers'];
      console.log( this.quickAddCategory)
   
    })
  }

  productPage(productId):void {
    this.route.navigate(['/dashboard/product-page', productId]);
  }

}
