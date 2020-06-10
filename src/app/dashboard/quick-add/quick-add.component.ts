import { Component, OnInit } from '@angular/core';
import { DashboardServiceService } from '../dashboard-service.service';

@Component({
  selector: 'app-quick-add',
  templateUrl: './quick-add.component.html',
  styleUrls: ['./quick-add.component.scss']
})
export class QuickAddComponent implements OnInit {

  constructor(
    private dashboardService: DashboardServiceService
  ) { }

  color;
  logo;
  productCategoryList;
  productCategoryMembers;
  productCategoryMap = [];
  first = 0;
  rows = 10;
  categoryId = "CATALOG1_QUICKADD1";
  cols = [
    { field: 'image', header: 'Image' },
    { field: 'product', header: 'Product Id' },
    { field: 'listPrice', header: 'List Price' },
    { field: 'normalPrice', header: 'Normal Price' },
    { field: 'quantity', header: 'Quantity'}
  ];

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.first === (this.productCategoryMap.length - this.rows);
  }

  isFirstPage(): boolean {
    return this.first === 0;
  }
  ngOnInit(): void {
    this.color = localStorage.getItem("fontColor");
    this.logo = localStorage.getItem("logo");
    this.quickAdd(this.categoryId);
  }

  quickAdd(categoryId) {
    
      this.dashboardService.quickadd(categoryId).subscribe((res) => {
      this.productCategoryList = res['data']['productCategoryList'];
      this.productCategoryMembers = res['data']['productSummary']['productCategoryMembers'];
      
      for (let productCategory in this.productCategoryMembers) {
        let productMap = {};
        productMap['image'] = '../../../assets/images/product.png';
        productMap['product'] = this.productCategoryMembers[productCategory]['product']['productId'];
        if (this.productCategoryMembers[productCategory]['productSummary'] && !this.productCategoryMembers[productCategory]['productSummary']['responseMessage']) {
          productMap['listPrice'] = this.productCategoryMembers[productCategory]['productSummary']['price']['averageCost'];
        }
        else {
          productMap['listPrice'] = '$29';
        }
        if (this.productCategoryMembers[productCategory]['productSummary'] && !this.productCategoryMembers[productCategory]['productSummary']['responseMessage']) {
          productMap['normalPrice'] = this.productCategoryMembers[productCategory]['productSummary']['price']['price'];
        }
        else {
          productMap['normalPrice'] = '$10';
        }
        productMap['quantity'] = '1';
        this.productCategoryMap.push(productMap);
      }

      console.log('here',this.productCategoryMap);

    })
  }

}
