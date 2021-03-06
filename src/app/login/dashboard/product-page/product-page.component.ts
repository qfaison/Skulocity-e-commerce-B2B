import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ProductPageServiceService } from './product-page-service.service';


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  productData;
  productId;
  quantity;
  alsoBoughtProducts;

  constructor(
    readonly route: ActivatedRoute,
    readonly service: ProductPageServiceService
  ) { }

  ngOnInit(): void {
    this.getProductDetails()
  }

  getProductDetails(): void {
    this.productId = this.route.snapshot.params['productId'];
    const catalogId = localStorage.getItem("catalogId");

    const data = {
      "CURRENT_CATALOG_ID": catalogId,
      "product_id": this.productId
    }

    this.service.openProduct(data).subscribe((res) => {
      this.productData = res['data'];
      this.alsoBoughtProducts = res['data']['alsoBoughtProducts'];
    })
  }

  addToCart(quantity): void {

    if (quantity === undefined || quantity === null) {
      Swal.fire('Oops...', 'Please enter the quantity!', 'error')
    }
    else {
      const data = {
        'add_product_id': this.productId,
        'quantity': quantity
      }

      this.service.addProductToCart(data).subscribe((res) => {
        this.productData = res['data'];
        Swal.fire("Product added successfully..!!")
      })
    }

  }

  addToCartAddOns(): void {
    const data = {
      'add_product_id': this.productId,
      'quantity': 1
    }

    this.service.addProductToCart(data).subscribe((res) => {
      this.productData = res['data'];
      Swal.fire("Product added successfully..!!")
    })


  }

  scroll(id) {
    const el = document.getElementById(id);
    el.scrollIntoView(true);
  }

}
