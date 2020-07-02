import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ShoppingListServiceService } from './shopping-list-service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {

  shopingList;
  createNew;
  editShopingData;
  listType;
  parentListType;
  updateShopingResponse;
  productStoreId;
  color;
  itemData;
  shoppingListIdVal;
  prodId;
  quan;
  custRequestId;
  quoteId;
  itemAddListResponse;

  constructor(
    private service: ShoppingListServiceService, 
    private router: Router
  ) { }

  shopingEditForm = new FormGroup({
    shopingListControl: new FormControl('', Validators.required),

  });
  shopingListSaveForm = new FormGroup({
    listName: new FormControl('', Validators.required),
    shoppingListTypeId: new FormControl('', Validators.required),
    parentShoppingListId: new FormControl(''),
    description: new FormControl('', Validators.required),
    isPublic: new FormControl('', Validators.required),
    isActive: new FormControl('', Validators.required),
    shoppingListId: new FormControl('')

  });
  ngOnInit() {
    this.color = localStorage.getItem("fontColor");
    this.getShoppigList();
  }
  getShoppigList(): void {
    this.service.getShopingList().subscribe((res) => {
      this.shopingList = res['data']['shoppingLists'];
      this.editShopingData = res['data']['shoppingList'];
      this.listType = res['data']['shoppingListTypes'];
      this.parentListType = res['data']['allShoppingLists'];
      this.productStoreId = res['data']['productStoreId'];
    })
  }
  getCreateNew(productStoreId): void {

    this.service.getCreateNew(productStoreId).subscribe((res) => {
      this.createNew = res['data']['shoppingListId'];
      this.editShopingData = res['data']['shoppingList'];
      this.getEditShoppigList(this.createNew)


    })
  }
  createRequestQuotes(shoppingListId): void {

    this.service.getRequestQuotes(shoppingListId).subscribe((res) => {
      this.custRequestId = res['data']['custRequestId'];
    })
  }
  createNewQuotes(shoppingListId): void {
    this.service.getCreateNewQuotes(shoppingListId).subscribe((res) => {
      this.quoteId = res['data']['quoteId'];
    })
  }
  getEditShoppigList(shoppingListId): void {
    this.service.getEditShopingList(shoppingListId).subscribe((res) => {
      this.shopingList = res['data']['shoppingLists'];
      this.editShopingData = res['data']['shoppingList'];
      this.listType = res['data']['shoppingListTypes'];
      this.parentListType = res['data']['allShoppingLists'];
      this.itemData = res['data']['shoppingListItemDatas'];
      console.log(this.editShopingData);

    })
  }

  shoppingListId(shoppingListId) {
    this.shoppingListIdVal = shoppingListId;
  }

  addProduct(productId, quantity, shoppingListId) {
    debugger
    let data = {
      'productId': productId,
      'quantity': quantity,
      'shoppingListId': shoppingListId
    }
    this.service.addItemShopingList(data).subscribe((res) => {
      if (res['data'] != null) {
        this.itemAddListResponse = res['data'];
        Swal.fire("Save Successfully");
      }
    }
    )
  }


  editShoppigList() {

    this.service.getEditShopingList(this.shoppingListIdVal).subscribe((res) => {

      this.editShopingData = res['data']['shoppingList'];


    })


  }

  downloadAvailable() {

  }

  updateShopingData() {

    let data = this.shopingListSaveForm.value;

    data["shoppingListId"] = this.shoppingListIdVal;


    this.service.UpdateShopingData(data).subscribe((res) => {
      if(res['data']['responseMessage'] == "success")
      {
        this.updateShopingResponse = res['data'];
        this.service.getEditShopingList(this.shoppingListIdVal).subscribe((res) => {
  
          this.editShopingData = res['data']['shoppingList'];
          Swal.fire("Updated Successfully");
        })
      }
      else{
        Swal.fire('Oops..!!','Some error occured..','error');
      }
    }
    )
  }

}
