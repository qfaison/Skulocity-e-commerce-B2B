import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ProductPageServiceService } from './product-page-service.service';
import { ShopAllService } from '../shop-all/shop-all.service';


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
  variantTreeSampleKeys;
  variantTree;
  productIdVarient;
  featuresModelVal = [];
  dropDownData = ["NA"];

  selectedVariantsData = [];

  constructor(
    readonly route: ActivatedRoute,
    readonly service: ProductPageServiceService,
    readonly shopAllService: ShopAllService
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
      if (this.featureList && this.featureList.length > 0) {
        this.featureTypes = res['data']['featureOrder'];
        this.variantTreeSampleKeys = res['data']['variantSampleKeys'];
        this.variantTree = res['data']['variantTree'];
      }
    })
  }

  getList(feature, index): void {
    let Varient;

    console.log("Feature -->> ", feature);
    this.selectedVariantsData[index] = feature;
    if (index === 0) {
      Varient = this.variantTree[feature];
    }
    else {
      let parentKey = this.selectedVariantsData[index - 1];
      Varient = this.variantTree[parentKey][feature];
    }


    if (Array.isArray(Varient)) {
      console.log("if statement", Varient);
      this.productIdVarient = Varient[0];
    }
    else {
      console.log("else statement", Varient);
      console.log("featuresModelVal[0]", this.featuresModelVal[0]);
      this.dropDownData.push(Varient);
    }
    console.log("selectedVariantsData --->> ", this.selectedVariantsData)
  }

  addToCart(quantity): void {

    if (quantity == undefined || quantity == null) {
      Swal.fire('Oops...', 'Please enter the quantity!', 'error')
    }
    else {

      let product;

      if (this.isVirtual === 'Y') {
        if (this.productIdVarient === undefined) {
          Swal.fire("Oops..!!", "Please select varient", 'error');
        }
        else {
          product = this.productIdVarient;
          let data = {
            'add_product_id': product,
            'quantity': quantity
          }

          this.service.addProductToCart(data).subscribe((res) => {
            this.productData = res['data'];
            Swal.fire("Product added successfully..!!");
            this.getCartCount();
          })
        }
      }
      else {
        product = this.productId;
        let data = {
          'add_product_id': product,
          'quantity': quantity
        }

        this.service.addProductToCart(data).subscribe((res) => {
          this.productData = res['data'];
          Swal.fire("Product added successfully..!!");
          this.getCartCount();
        })
      }
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

  getCartCount(): void {
    this.shopAllService.showCart().subscribe((res) => {
      this.shopAllService.addValueToCart(res['data']['cart']['shoppingCartSize']);
      this.getProductDetails();
    })
  }

  scroll(id) {
    const el = document.getElementById(id);
    el.scrollIntoView(true);
  }

}
