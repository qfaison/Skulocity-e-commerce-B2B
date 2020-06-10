import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DashboardServiceService } from '../dashboard/dashboard-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private dashboardService : DashboardServiceService,
    private router : Router
    ) { }

  color;
  logo;
  currentPage;
  catalogs;
  categories;
  promos;
  contents;
  contentcategorylist;
  blogList;
  catalogId;
  currentCatalogId;


  ngOnInit(): void {
    this.color = localStorage.getItem("fontColor");
    this.logo = localStorage.getItem("logo");
    this.currentPage = this.router.url;
    this.main();
  }

  main() {
    let data = {};
    this.dashboardService.main(data).subscribe((res) => {
      //console.log(res);
      this.catalogs = res['data']['catalogCol'];
      localStorage.setItem("catalogId",this.catalogs[0]['prodCatalogId']);
      this.categories = res['data']['categoryList'];
      this.promos = res['data']['promotext']['productPromos'];
      this.contents = res['data']['browsecategorylist'];
      this.contentcategorylist = res['data']['contentcategorylist'];
      this.blogList = res['data']['blogscategorylist'];
      this.currentCatalogId = res['data']['currentCatalogId'];
      this.getSpecialCategory();
    })
  }

  getSpecialCategory(){
    let catalogId = localStorage.getItem('catalogId');
    let data = {
      'catalogId' : catalogId,
      'categoryType' : 'FEATURED'
    }
    this.dashboardService.getSpecialCategory(data).subscribe((res)=>{
      //console.log(res)
    })
  }

  selectCategory(category){
    this.router.navigate(['/dashboard/category', category.productCategoryId]);
  }

  catalogFunction(catalog){
    localStorage.setItem('catalogId',catalog.prodCatalogId);
    this.router.navigate(['/dashboard/catalog', catalog.prodCatalogId]);
  }

}
