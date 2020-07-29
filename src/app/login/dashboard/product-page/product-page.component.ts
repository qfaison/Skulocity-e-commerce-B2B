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
  quantity = 1;
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
  configurableProduct;
  quesList;
  comment = [];
  commentCheckBox = [];
  confDropdowns = [];
  checkbox = [];
  data = {};

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
      this.configurableProduct = res['data']['productSummary']['product']['productTypeId'];
      let List = res['data']['productSummary']['quesList'];
      if (List.length > 0 && this.configurableProduct === 'AGGREGATED') {
        this.quesList = res['data']['productSummary']['quesList'];
      }
      else if (List.length === 0 && this.configurableProduct === 'AGGREGATED') {
        Swal.fire("Product is not configured properly");
      }
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

    if (this.configurableProduct === 'AGGREGATED') {
      console.log("comment", this.comment);
      console.log("confDropdowns", this.confDropdowns);
    }
    else {
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
              if (res['data']['responseMessage'] != null) {
                Swal.fire(res['data']['responseMessage']);
              }
              else if (res['data']['errorMessage'] != null) {
                Swal.fire(res['data']['errorMessage']);
              }
              else {
                this.productData = res['data'];
                Swal.fire("Product added successfully..!!");
                this.getCartCount();
              }

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
            if (res['data']['responseMessage'] != null) {
              Swal.fire(res['data']['responseMessage']);
            }
            else if (res['data']['errorMessage'] != null) {
              Swal.fire(res['data']['errorMessage']);
            }
            else {
              this.productData = res['data'];
              Swal.fire("Product added successfully..!!");
              this.getCartCount();
            }

          })
        }
      }
    }



  }

  addToCartAddOns(): void {
    const data = {
      'add_product_id': this.productId,
      'quantity': 1
    }

    this.service.addProductToCart(data).subscribe((res) => {
      if (res['responseMessage'] != null) {
        Swal.fire(res['responseMessage']);
      }
      else if (res['errorMessage'] != null) {
        Swal.fire(res['errorMessage']);
      }
      else {
        this.productData = res['data'];
        Swal.fire("Product added successfully..!!")
      }

    })


  }

  selectProductDetails(conf, index, isSingleChoice, checkboxIndex): void {

    if (this.quantity === undefined) {
      Swal.fire('Oops..!!', 'Please select Quantity', 'error');
    }
    else {

      console.log(this.quesList);

      let arr = this.quesList[index]['options'];

      for (let key in arr) {
        if (key != 'getIndexBy') {
          if (arr[key]['description'] === conf) {
            let arr = [];
            let keyInt : number = +key;
            arr.push(keyInt);
            this.data[index] = arr;
          }
        }
      }


      if (isSingleChoice) {
        for (let comm in this.comment) {
          if (comm <= index) {
            this.data['comments_' + comm + '_0'] = this.comment[comm];
          }

        }
      }
      else {
        for (let comm in this.commentCheckBox) {
          if (comm <= checkboxIndex) {
            this.data['comments_' + index + '_' + checkboxIndex] = this.commentCheckBox[comm];
          }
        }
      }

      this.data['add_product_id'] = this.productId;
      this.data['quantity'] = this.quantity;
      console.log(this.data);
      this.service.getConfigDetailsEvent(this.data).subscribe((res) => {
        console.log("Config Data Price Update", res);
      })

    }
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
