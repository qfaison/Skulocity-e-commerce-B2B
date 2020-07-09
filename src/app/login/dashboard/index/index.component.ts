import { Component, OnInit } from '@angular/core';
import { ShopAllService } from '../shop-all/shop-all.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  color;
  CatalogId;

  constructor(
    readonly service : ShopAllService
  ) { }

  ngOnInit(): void {
    this.color = localStorage.getItem("fontColor");
    this.main();
  }

  main(): void {
    if (localStorage.getItem('catalogId') == null) {
      this.service.main().subscribe((res) => {
        this.CatalogId = res['data']['currentCatalogId'];
        localStorage.setItem('catalogId',res['data']['currentCatalogId']);
      })
    }
    else {
      const catalogId = {
        'CURRENT_CATALOG_ID': localStorage.getItem('catalogId')
      };
      this.service.getMainCatalogId(catalogId).subscribe((res) => {
        this.CatalogId = res['data']['currentCatalogId'];
      })
    }
  }

}
