import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardServiceService } from '../dashboard-service.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {
  color;
  logo;
  urlSubscriber: any;
  productName;
  longDescription;
  subCategoryData;
  categoryData;
  quantity = [];
  productCategoryId;
  cartItemCount;

  constructor(
    private dashboardService: DashboardServiceService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.color = localStorage.getItem("fontColor");
    this.logo = localStorage.getItem("logo");
    this.getCategoryData();
  }

  getCategoryData(): void {
    this.urlSubscriber = this.route.paramMap.subscribe((data: any) => {
      const categoryId = data.params.categoryId;
      this.dashboardService.getCategory(categoryId).subscribe((res) => {
        if (res['data']['productDetails']['productCategoryName']) {
          this.productName = res['data']['productDetails']['productCategoryName'];
        }
        else {
          this.productName = ""
        }
        if (res['data']['productDetails']['productCategory']['longDescription']) {
          this.longDescription = res['data']['productDetails']['productCategory']['longDescription'];
        }
        else {
          this.longDescription = ""
        }
        if (res['data']['subCategory'].length >= 1) {
          this.subCategoryData = res['data']['subCategory'];
        }
        else {
          this.subCategoryData = [];
        }
        if (res['data']['productDetails']) {
          this.categoryData = res['data']['productDetails']['productCategoryMembers'];
        }
        else {
          this.categoryData = [];
        }

        console.log("test",this.categoryData);
      })
    });
  }

  addProductToCart(quantity: any, productId: string): void {
    if (!quantity) {
      swal.fire('Oops...', 'Quantity must be greater than 0!', 'error');
    }
    else {
      let data = {
        'add_product_id': productId,
        'quantity': quantity + ""
      }
      this.dashboardService.addItem(data).subscribe((res) => {
        console.log(res);
        this.getCartCount();
      })
    }
  }

  getCartCount(): void {
    this.dashboardService.getCartDetail().subscribe((res) => {
      this.dashboardService.addValueToCart(res['data']['cart']['shoppingCartSize']);
    })
  }

  ngOnDestroy(): void {
    this.urlSubscriber.unsubscribe()
  }

}
