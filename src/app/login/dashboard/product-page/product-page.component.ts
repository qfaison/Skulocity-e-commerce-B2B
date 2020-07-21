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
  isVirtual;
  featureList;
  featureTypes;
  variantTree;
  productIdVarient;

  constructor(
    readonly route: ActivatedRoute,
    readonly service: ProductPageServiceService
  ) { }

  ngOnInit(): void {
    this.getProductDetails()
  }

  getProductDetails(): void {
    this.productId = this.route.snapshot.params['productId'];
    this.isVirtual = this.route.snapshot.params['isVirtual'];
    console.log("Is a varient product -->> ", this.isVirtual)
    const catalogId = localStorage.getItem("catalogId");

    const data = {
      "CURRENT_CATALOG_ID": catalogId,
      "product_id": this.productId
    }

    this.service.openProduct(data).subscribe((res) => {
      this.productData = res['data'];
      this.alsoBoughtProducts = res['data']['alsoBoughtProducts'];
      this.featureList = res['data']['featureOrder'];
      if (this.featureList.length > 0) {
        this.featureTypes = res['data']['featureOrder'];
        this.variantTree = res['data']['variantSampleKeys'];
      }
    })
  }

  getList(feature): void {

    console.log("Feature -->> ", feature);
    let Varient = this.variantTree[feature];

    if(Array.isArray(Varient)){
      console.log("if statement", Varient);
    }
    else{
      console.log("else statement", Varient);
    }
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
