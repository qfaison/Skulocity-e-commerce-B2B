import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ShopAllService } from './shop-all.service';

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
  toggleSwitchCatalog : boolean = true;
  categoryListCatalog;
  productListCatalog;
  subCategoryList;
  subCategoryProductsList;
  showSubCategory: boolean = false;
  quantity = [];
  quantityProduct = [];

  constructor(
    private service : ShopAllService
  ) { }

  ngOnInit(): void {
    this.main();
    this.getSpecialCategory();
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
        localStorage.setItem('catalogId',res['data']['currentCatalogId']);
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
      })
    }
  }

  showCategories(catalog,index): void{
    if(this.toggleSwitchCatalog)
    {
      this.toggleSwitchCatalog = !this.toggleSwitchCatalog;
      let li = document.getElementById(catalog);
      li.classList.add("open");
      li.classList.add("active");
      document.getElementById(catalog+""+index).style.display = "block";
    }
    else{
      this.toggleSwitchCatalog = !this.toggleSwitchCatalog;
      let li = document.getElementById(catalog);
      li.classList.remove("open");
      li.classList.remove("active");
      document.getElementById(catalog+""+index).style.display = "none";
    }
    
  }

  getSpecialCategory():void {
    let catalogId = localStorage.getItem('catalogId')
    this.service.getSpecialCategory(catalogId).subscribe((res)=>{
      this.categoryListCatalog = res['data']['categoryList'];
      this.productListCatalog = res['data']['productList'];
    })
  }

  getSubcategories(categoryId):void {
    
    this.service.getSubCategory(categoryId).subscribe((res)=>{
      console.log("getSubCategory --->> ",res);
      this.showSubCategory = true;
      this.subCategoryList = res['data']['subCategory'];
      this.subCategoryProductsList = res['data']['productDetails']['productCategoryMembers'];
    })

  }

  addProductToCart(quantity, productId):void {
    if(quantity == undefined){
      Swal.fire('Oops...', 'Please select quantity first!', 'error');
    }
    else{
      let data = {
        add_product_id: productId,
        quantity: quantity
      }
      this.service.addProductToCart(data).subscribe((res)=>{
        console.log(res);
        if(res['message'])
        {
          Swal.fire('Product added to cart..!!')
          this.showCart();
        }
      })
    }
  }

  showCart(): void {
    this.service.showCart().subscribe((res)=>{
      console.log('showCart --->> ',res);
    })
  }

}
