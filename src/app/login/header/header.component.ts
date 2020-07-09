import { Component, OnInit, HostListener } from '@angular/core';
import { DashboardService } from '../dashboard/dashboard.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ShopAllService } from '../dashboard/shop-all/shop-all.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  logoDark: boolean;
  fontColor: string;
  color: string = 'transparent';
  isLogin: boolean = false;
  toggleShow: boolean = false;
  myBag: boolean = false;
  checkoutBagShow: boolean = false;
  orderConfirmationPaymentShow: boolean = false;
  bagFinishShow: boolean = false;
  cartDetailsList;
  logo;
  cartSize: number = 0;
  postalAddresses;
  cartSubscriber: any;

  grandTotalAmount: number;
  checkoutFormData;
  paymentFormData;
  shippingMethods;
  itemDetails;
  totalPaymentAmout: number;
  toggleShow1: boolean = false;
  contMechId;
  shippingMethod;
  orderDetailsScreen: boolean = false;
  paymentMethodType;
  postalAddress;
  method;
  orderItems;
  prices;
  orderId;

  constructor(
    readonly router: Router,
    readonly service: DashboardService,
    readonly serviceCart: ShopAllService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('isLogin') == 'true') {
      this.isLogin = true;
    }
    this.logo = localStorage.getItem('logo');
    this.showCart();
    this.cartSubscriber = this.serviceCart.cartSubscriber.subscribe((value) => {
      this.cartSize = value;
    })
  }

  showCart(): void {
    this.service.showCart().subscribe((res) => {
      this.cartSize = res['data']['cart']['shoppingCartSize'];
      this.cartDetailsList = res['data']['cart']['shoppingCart'];
      this.grandTotalAmount = res['data']['getItemList']['getDisplayGrandTotalAmount']
    })
  }

  signOut() {
    this.service.logout().subscribe((res) => {
      this.isLogin = false;
      localStorage.clear();
      this.router.navigate(['/']);
      Swal.fire('You are logged out successfully..!!');
    })
  }

  showBag(): void {
    if (localStorage.getItem("token")) {
      this.toggleShow = false;
      this.toggleShow1 = true;
    }
    else {
      this.toggleShow = true;
      this.toggleShow1 = false;
    }

    this.myBag = true;
  }
  hideBag(): void {
    this.toggleShow1 = false;
    this.toggleShow = false;
    this.myBag = false;
    this.checkoutBagShow = false;
    this.orderConfirmationPaymentShow = false;
    this.bagFinishShow = false;
    this.orderDetailsScreen = false;
  }

  checkoutOptions(): void {
    this.myBag = false;
    this.checkoutBagShow = true;
    this.service.checkoutOptions().subscribe((res) => {
      console.log(res);
      if (!res['error']) {
        this.checkoutFormData = res['data']['checkoutOptions']['postalAddresses'];
        this.taxInfo();
      }
    })
  }

  taxInfo(): void {
    this.service.taxInfo().subscribe((res) => {
      console.log(res);
    })
  }

  checkoutOptionsCheckoutPageShippingAddress(): void {

    let data = {
      "shipping_contact_mech_id": this.contMechId,
      "checkoutpage": "shippingaddress"
    }
    this.service.checkoutOptionsCheckoutPage(data).subscribe((res) => {
      if (!res['error']) {
        this.shippingMethods = res['data']['checkoutOptions']['carrierShipmentMethodList'];
      }
    })
  }

  checkoutOptionsCheckoutPageShippingOptions(): void {
    this.checkoutBagShow = false;
    this.orderConfirmationPaymentShow = true;
    let data = {
      'checkoutpage': "shippingoptions",
      'is_gift': false,
      'may_split': false,
      'shipping_method': this.shippingMethod
    }
    this.service.checkoutOptionsCheckoutPageOptions(data).subscribe((res) => {
      if (!res['error']) {
        this.totalPaymentAmout = res['data']['getDisplayGrandTotalAmount'];
        this.paymentFormData = res['data']['checkoutPayment']['creditCard'];
        this.itemDetails = res['data']['checkoutPayment']['shoppingCart'];
      }
    })
  }

  checkoutPayment(): void {
    this.orderConfirmationPaymentShow = false;
    this.orderDetailsScreen = true;
    let data = {
      'BACK_PAGE': "checkoutoptions",
      'checkOutPaymentId': this.paymentFormData[0]['paymentMethodId'],
      'checkoutpage': "payment"
    }
    this.service.checkoutOptionsCheckoutPagePayments(data).subscribe((res) => {
      if (res['status'] === "ACCEPTED") {
        this.review();
      }
      else {

      }
    })
  }

  review(): void {
    this.service.review().subscribe((res) => {
      if (!res['error']) {
        this.paymentMethodType = res['data']['paymentMethodType']['description'];
        this.postalAddress = res['data']['postalAddress'];
        this.method = res['data']['carrierPartyId'] + ' ' + res['data']['shipmentMethodTypeId'];
        this.orderItems = res['data']['orderItems'];
        this.prices = res['data'];
      }
      else {

      }
    })
  }

  submitOrder() {
    this.orderDetailsScreen = false;
    this.bagFinishShow = true;
    let data = { checkoutpage: "payment" }
    this.service.submitOrder(data).subscribe((res) => {
      if (!res['error']) {
        this.orderId = res['data']['orderId'];
        this.clearCart();
      }
      else {

      }
    })
  }

  clearCart():void {
    this.service.emptyCart().subscribe((res) => {
      if (res['data'] === "success") {
        this.showCart();
      }
      else {

      }
    })
  }

  @HostListener("window:scroll", [""])
  onWindowScroll(): void {

    let top = (document.documentElement.scrollTop);
    if (top > 30) {
      this.logoDark = true;
      this.color = localStorage.getItem("fontColor");
    }
    else {
      this.logoDark = false;
      this.color = 'transparent';
    }
  }

}
