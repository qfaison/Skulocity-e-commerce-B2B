import { Component, OnInit, HostListener } from '@angular/core';
import { DashboardService } from '../dashboard/dashboard.service';
import { Router, ActivatedRoute } from '@angular/router';
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
  cartSize: number = 2;
  postalAddresses;

  constructor(
    public router: Router,
    private service: DashboardService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('isLogin') == 'true') {
      this.isLogin = true;
    }
    this.logo = localStorage.getItem('logo');
    this.showCart();
  }

  showCart(): void {
    this.service.showCart().subscribe((res) => {
      //this.cartDetailsList = res['data']['cart']['shoppingCartList'];
      this.cartSize = 2;
      this.cartDetailsList = [
        {
          "itemIndex": 0,
          "optionalProductFeature": {

          },
          "shoppingListId": null,
          "isPromo": false,
          "product": {
            "productId": "GZ-DIG",
            "productTypeId": "DIGITAL_GOOD",
            "primaryProductCategoryId": "101",
            "manufacturerPartyId": null,
            "facilityId": null,
            "introductionDate": null,
            "releaseDate": null,
            "supportDiscontinuationDate": null,
            "salesDiscontinuationDate": null,
            "salesDiscWhenNotAvail": null,
            "internalName": "Digital Gizmo",
            "brandName": null,
            "comments": null,
            "productName": "Digital Gizmo",
            "description": "A digital gizmo: can be downloaded immediately after purchase.",
            "longDescription": "This gizmo is part of an exciting new breed that needs no corporeal form: it is all digital! Buy and download it now!",
            "priceDetailText": null,
            "smallImageUrl": null,
            "mediumImageUrl": null,
            "largeImageUrl": null,
            "detailImageUrl": null,
            "originalImageUrl": null,
            "detailScreen": null,
            "inventoryMessage": null,
            "requireInventory": null,
            "quantityUomId": null,
            "quantityIncluded": null,
            "piecesIncluded": null,
            "requireAmount": null,
            "fixedAmount": null,
            "amountUomTypeId": null,
            "weightUomId": null,
            "weight": null,
            "productWeight": null,
            "heightUomId": null,
            "productHeight": null,
            "shippingHeight": null,
            "widthUomId": null,
            "productWidth": null,
            "shippingWidth": null,
            "depthUomId": null,
            "productDepth": null,
            "shippingDepth": null,
            "diameterUomId": null,
            "productDiameter": null,
            "productRating": null,
            "ratingTypeEnum": null,
            "returnable": null,
            "taxable": "Y",
            "chargeShipping": "N",
            "autoCreateKeywords": "Y",
            "includeInPromotions": null,
            "isVirtual": "N",
            "isVariant": "N",
            "virtualVariantMethodEnum": null,
            "originGeoId": null,
            "requirementMethodEnumId": null,
            "billOfMaterialLevel": null,
            "reservMaxPersons": null,
            "reserv2ndPPPerc": null,
            "reservNthPPPerc": null,
            "configId": null,
            "createdDate": 989755200000,
            "createdByUserLogin": "admin",
            "lastModifiedDate": 989755200000,
            "lastModifiedByUserLogin": "admin",
            "inShippingBox": null,
            "defaultShipmentBoxTypeId": null,
            "lastUpdatedStamp": 1575358123200,
            "lastUpdatedTxStamp": 1575358121352,
            "createdStamp": 1575358123200,
            "createdTxStamp": 1575358121352,
            "isActive": null,
            "publishedScopeId": null,
            "shopifyFulfillmentService": null
          },
          "s3ImageUrl": "",
          "giftWrap": null,
          "price": 81.00000000000,
          "otherAdjustment": 0.00000,
          "quantity": 1,
          "subTotal": 81.00000000000
        }
      ]
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
    this.toggleShow = true;
    this.myBag = true;
  }
  hideBag(): void {
    this.toggleShow = false;
    this.myBag = false;
    this.checkoutBagShow = false;
    this.orderConfirmationPaymentShow = false;
    this.bagFinishShow = false;
  }

  checkoutOptions(): void {
    this.myBag = false;
    this.checkoutBagShow = true;
    this.service.checkoutOptions().subscribe((res) => {
      console.log(res);
    })
    this.postalAddresses = [
      {
        "postalAddress": {
          "contactMechId": "32260",
          "toName": "Customer of Reseller",
          "attnName": "Customer Contact1",
          "address1": "1775 Lakeshore Circle",
          "address2": null,
          "directions": null,
          "city": "Fort Lauderdale",
          "postalCode": "33326",
          "postalCodeExt": null,
          "countryGeoId": "USA",
          "stateProvinceGeoId": "FL",
          "countyGeoId": null,
          "postalCodeGeoId": null,
          "geoPointId": null,
          "lastUpdatedStamp": 1582310972768,
          "lastUpdatedTxStamp": 1582310972714,
          "createdStamp": 1582310972768,
          "createdTxStamp": 1582310972714
        }
      },
      {
        "postalAddress": {
          "contactMechId": "26480",
          "toName": "DemoCus Company",
          "attnName": null,
          "address1": "1750 Lakeshore Circle",
          "address2": null,
          "directions": null,
          "city": "Weston",
          "postalCode": "33326",
          "postalCodeExt": null,
          "countryGeoId": "USA",
          "stateProvinceGeoId": "FL",
          "countyGeoId": null,
          "postalCodeGeoId": null,
          "geoPointId": null,
          "lastUpdatedStamp": 1579864197404,
          "lastUpdatedTxStamp": 1579864197363,
          "createdStamp": 1579864197404,
          "createdTxStamp": 1579864197363
        }
      }
    ]
  }

  checkoutOptionsCheckoutPageShippingAddress():void {

    this.checkoutBagShow = false;
    this.orderConfirmationPaymentShow = true;
    let data = {

    }
    // this.service.checkoutOptionsCheckoutPage().subscribe((res) => {
    //   console.log(res);
    // })
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
