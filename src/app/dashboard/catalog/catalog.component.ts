import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardServiceService } from '../dashboard-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit, OnDestroy {
  urlSubscriber: any;

  constructor(
    private dashboardService: DashboardServiceService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getCatalogData();
  }

  getCatalogData(): void{
    this.urlSubscriber = this.route.paramMap.subscribe((data: any )=>{
      const catalogId = data.params.catalogId;
      this.dashboardService.getCatalog(catalogId).subscribe((res)=>{
        console.log(res);
      })
    });
  }

  ngOnDestroy(): void {
    this.urlSubscriber.unsubscribe()
  }

}
