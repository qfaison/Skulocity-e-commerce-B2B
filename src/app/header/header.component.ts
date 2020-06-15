import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from '../login/login-service.service';
import { DashboardServiceService } from '../dashboard/dashboard-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartSubscriber: any;

  constructor(
    private router : Router,
    private loginService : LoginServiceService,
    private dashboardService : DashboardServiceService
    ) { }

    //res.data.cart.shoppingCartList

  color;
  logo;
  logoDark: boolean = false;
  fontColor;
  fontColorCheckout = '#ffffff';
  colorCheckout;
  toggleShow: boolean = false;
  showBagScreenShow: boolean = false;
  cartDetailsList;
  checkoutScreenShow: boolean = false;
  cartItemCount: number;

  ngOnInit(): void {
    this.color = "#ffffff";
    this.logo = localStorage.getItem("logo");
    this.colorCheckout = localStorage.getItem("fontColor");
    this.fontColor = '#000000';
    this.getCartCount();
    this.cartSubscriber = this.dashboardService.cartSubscriber.subscribe((value)=>{
      this.cartItemCount = value;
    })
  }

  ngOnDestroy(): void {
    this.cartSubscriber.unsubscribe();
  }

  getCartCount(): void {
    this.dashboardService.getCartDetail().subscribe((res) => {
      this.cartItemCount = res['data']['cart']['shoppingCartSize'];
    })
  }

  logout(): void{
    this.loginService.logout().subscribe((res)=>{
      this.router.navigate(['/']);
    });
  }

  cartDetails(): void{
    this.dashboardService.getCartDetail().subscribe((res)=>{
      this.cartDetailsList = res['data']['cart']['shoppingCartList'];
    })
  }

  showBag(): void{
    this.toggleShow = true;
    this.showBagScreenShow = true;
  }

  checkoutScreen(): void{
    this.toggleShow = false;
    this.showBagScreenShow = false;
  }

  checkout(): void{
    this.showBagScreenShow = false;
    this.checkoutScreenShow = true;
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll(): void{
  
  let top = (document.documentElement.scrollTop);
    if(top > 50 )   {
      this.logoDark = true;
      this.color = localStorage.getItem("fontColor");
      this.fontColor = '#ffffff';
    }
    else{
      this.logoDark = false;
      this.color = '#ffffff';
      this.fontColor = '#000000';
    }
  }

}
