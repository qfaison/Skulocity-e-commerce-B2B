import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ShopAllService } from './shop-all.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop-all',
  templateUrl: './shop-all.component.html',
  styleUrls: ['./shop-all.component.scss']
})
export class ShopAllComponent implements OnInit {

  openmenustatus = false;
  catalogsList;
  categoryList;
  currentCatalogId = localStorage.getItem("catalogId");
  CatalogId;
  toggleSwitchCatalog: boolean = true;
  categoryListCatalog;
  productListCatalog;
  subCategoryList;
  subCategoryProductsList;
  showSubCategory: boolean = false;
  quantity = [];
  quantityProduct = [];
  customerPartyId;
  urlSubscriber: any;

  constructor(
    private service: ShopAllService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.customerPartyId = localStorage.getItem("customerPartyId");
    this.main();
  }

  mouseon() {
    this.openmenustatus = true;
  }
  mouseout() {
    this.openmenustatus = false;
  }
  closemenu() {
    this.openmenustatus = false;
  }

  main(): void {
    if (localStorage.getItem('catalogId') == null) {
      this.service.main().subscribe((res) => {
        this.catalogsList = res['data']['catalogCol'];
        this.categoryList = res['data']['categoryList'];
        this.CatalogId = res['data']['currentCatalogId'];
        localStorage.setItem('catalogId', res['data']['currentCatalogId']);
        this.getSpecialCategory();
      })
    }
    else {
      let catalogId = {
        'CURRENT_CATALOG_ID': localStorage.getItem('catalogId')
      };
      this.service.getMainCatalogId(catalogId).subscribe((res) => {
        this.catalogsList = res['data']['catalogCol'];
        this.categoryList = res['data']['categoryList'];
        this.CatalogId = res['data']['currentCatalogId'];
        this.getSpecialCategory();
      })
    }
  }

  showCatData(catalog, index): void {

    this.categoryList = [];

    localStorage.setItem('catalogId', catalog);

    let catalogId = {
      'CURRENT_CATALOG_ID': catalog
    };
    this.service.getMainCatalogId(catalogId).subscribe((res) => {
      this.catalogsList = res['data']['catalogCol'];
      this.categoryList = res['data']['categoryList'];
      this.CatalogId = res['data']['currentCatalogId'];
      this.showCategories(catalog, index);
      if (this.categoryList.length == 0) {
        Swal.fire('No categories present')
      }
    })

  }

  showCategories(catalog, index): void {
    let li = document.getElementById(catalog);
    li.classList.add("open");
    li.classList.add("active");
    let catalogListId = catalog + "-" + index;
    setTimeout(() => {
      if (document.getElementById(catalogListId)) document.getElementById(catalogListId).style.display = "block";
    }, 0);
  }

  openProduct(productId): void {
    this.router.navigate(['/dashboard/product-page', productId]);
  }

  getSpecialCategory(): void {
    let catalogId = localStorage.getItem('catalogId')
    this.service.getSpecialCategory(catalogId).subscribe((res) => {
      this.categoryListCatalog = res['data']['categoryList'];
      this.productListCatalog = res['data']['productList'];
    })
  }

  getSubcategories(categoryId): void {

    this.service.getSubCategory(categoryId).subscribe((res) => {
      console.log("getSubCategory --->> ", res);
      this.showSubCategory = true;
      this.subCategoryList = res['data']['subCategory'];
      this.subCategoryProductsList = res['data']['productDetails']['productCategoryMembers'];
    })

  }

  addProductToCart(quantity, productId): void {
    if (quantity == undefined) {
      Swal.fire('Oops...', 'Please select quantity first!', 'error');
    }
    else {
      let data = {
        add_product_id: productId,
        quantity: quantity
      }
      this.service.addProductToCart(data).subscribe((res) => {
        console.log(res);
        if (res['message']) {
          Swal.fire('Product added to cart..!!')
          this.showCart();
        }
      })
    }
  }

  showCart(): void {
    this.service.showCart().subscribe((res) => {
      this.service.addValueToCart(res['data']['cart']['shoppingCartSize']);
    })
  }

}
