import { Component, OnInit, HostListener } from '@angular/core';
import { DashboardService } from '../dashboard/dashboard.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ShopAllService } from '../dashboard/shop-all/shop-all.service';
import Swal from 'sweetalert2';
import { FormGroup, FormControl } from '@angular/forms';

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

  errorMessage;
  paymentMethodId;
  thColor;
  errorMessageTermsAndConditions;
  termsCondChecked: boolean = false;
  selectPaymentErrorMessage;

  addAdressForm: boolean = false;
  countries;
  states;

  addNewCard:boolean = false;
  billingAddresses;
  months;
  years = [];

  getDates() {
    var date = new Date();
    var currentYear = date.getFullYear();

    //set values for year dropdown
    for (var i = 0; i <= 100; i++) {
      this.years.push(currentYear + i);
    }
    //set values for month dropdown
    this.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  }

  constructor(
    readonly router: Router,
    readonly service: DashboardService,
    readonly serviceCart: ShopAllService
  ) { }

  addressForm = new FormGroup({
    toName: new FormControl(''),
    attnName: new FormControl(''),
    city: new FormControl(''),
    stateProvinceGeoId: new FormControl(''),
    allowSolicitation: new FormControl(''),
    address1: new FormControl(''),
    address2: new FormControl(''),
    postalCode: new FormControl(''),
    countryGeoId: new FormControl('')
  });

  cardForm = new FormGroup({
    companyNameOnCard: new FormControl(''),
    firstNameOnCard: new FormControl(''),
    lastNameOnCard: new FormControl(''),
    cardType: new FormControl(''),
    expYear: new FormControl(''),
    expMonth: new FormControl(''),
    titleOnCard: new FormControl(''),
    middleNameOnCard: new FormControl(''),
    suffixOnCard: new FormControl(''),
    cardNumber: new FormControl(''),
    description: new FormControl(''),
    contactMechId: new FormControl('')
  });


  ngOnInit(): void {
    if (localStorage.getItem('isLogin') == 'true') {
      this.isLogin = true;
    }
    this.getDates();
    this.logo = localStorage.getItem('logo');
    this.thColor = localStorage.getItem("fontColor")
    this.showCart();
    this.cartSubscriber = this.serviceCart.cartSubscriber.subscribe((value) => {
      this.cartSize = value;
    })
  }

  termsChecked(): void {
    this.termsCondChecked = !this.termsCondChecked;
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

    if (this.shippingMethod == undefined) {
      this.errorMessage = "Please select valid shipping method";
    }
    else if (this.contMechId == undefined) {
      this.errorMessage = "Please select valid shipping address";
    }
    else {
      this.errorMessage = "";
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

  }

  setPaymentMethodId(paymentMethodId): void {
    this.paymentMethodId = paymentMethodId;
  }

  checkoutPayment(): void {

    if (this.paymentMethodId != null || this.paymentMethodId != undefined) {
      this.orderConfirmationPaymentShow = false;
      this.orderDetailsScreen = true;
      let data = {
        'BACK_PAGE': "checkoutoptions",
        'checkOutPaymentId': this.paymentMethodId,
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
    else {
      this.selectPaymentErrorMessage = "Please select a card";
    }
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

    if (this.termsCondChecked) {
      this.orderDetailsScreen = false;
      this.bagFinishShow = true;
      let data = { checkoutpage: "payment" }
      this.service.submitOrder(data).subscribe((res) => {
        if (!res['error']) {
          this.orderId = res['data']['orderId'];
          this.clearCart();
        }
      })
    }
    else {
      this.errorMessageTermsAndConditions = "Please agree to the terms and conditions first..!!"
    }
  }

  clearCart(): void {
    this.service.emptyCart().subscribe((res) => {
      if (res['data'] === "success") {
        this.showCart();
      }
      else {

      }
    })
  }

  addAddress(): void {
    console.log(this.addressForm.value);
    let data = this.addressForm.value;
    data['contactMechPurposeTypeId'] = "SHIPPING_LOCATION";
    this.service.addAdress(data).subscribe((res) => {
      if (res['data']['responseMessage'] === "success") {
        this.addAdressForm = false;
        this.checkoutOptions();
      }
    })
  }

  addAddressPopup(): void {
    this.addAdressForm = true;
    this.service.getCountriesAndStates().subscribe((res) => {
      if (!res['error']) {
        this.countries = res['data']['countries'];
        this.states = res['data']['states'];
      }
    })
  }

  addAdressHide(): void {
    this.addAdressForm = false;
  }

  addCardHide(): void {
    this.addNewCard = false;
  }

  addCard():void {
    this.addNewCard = true;
    this.service.getPostalAddresses().subscribe((res) => {
      if (!res['error']) {
        this.billingAddresses = res['data']['postalAddressInfos'];
      }
    })
  }

  addNewCardDetails():void{
    console.log(this.cardForm.value);
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
