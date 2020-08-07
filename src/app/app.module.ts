import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APIInterceptor } from './interceptor.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './login/dashboard/dashboard.component';
import { HeaderComponent } from './login/header/header.component';
import { IndexComponent } from './login/dashboard/index/index.component';
import { FooterComponent } from './login/footer/footer.component';
import { ShopAllComponent } from './login/dashboard/shop-all/shop-all.component';
import { KeratinComponent } from './login/dashboard/keratin/keratin.component';
import { FaqComponent } from './login/dashboard/faq/faq.component';
import { AboutComponent } from './login/dashboard/about/about.component';
import { ContactComponent } from './login/dashboard/contact/contact.component';
import { MyProfileComponent } from './login/dashboard/my-profile/my-profile.component';
import { QuickAddComponent } from './login/dashboard/quick-add/quick-add.component';
import { OrderHistoryComponent } from './login/dashboard/order-history/order-history.component';
import { ShoppingListComponent } from './login/dashboard/shopping-list/shopping-list.component';
import { RequestsComponent } from './login/dashboard/requests/requests.component';
import { QuotesComponent } from './login/dashboard/quotes/quotes.component';
import { MessagesComponent } from './login/dashboard/messages/messages.component';
import { ViewQuotesComponent } from './login/dashboard/quotes/view-quotes/view-quotes.component';
import { ProductPageComponent } from './login/dashboard/product-page/product-page.component';
import { ViewRequestComponent } from './login/dashboard/requests/view-request/view-request.component';
import { ViewOrderHistoryComponent } from './login/dashboard/order-history/view-order-history/view-order-history.component';
import { CreateUserComponent } from './login/dashboard/create-user/create-user.component';
import { CreateAccountComponent } from './login/dashboard/create-account/create-account.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    IndexComponent,
    FooterComponent,
    ShopAllComponent,
    KeratinComponent,
    FaqComponent,
    AboutComponent,
    ContactComponent,
    MyProfileComponent,
    QuickAddComponent,
    OrderHistoryComponent,
    ShoppingListComponent,
    RequestsComponent,
    QuotesComponent,
    MessagesComponent,
    ViewQuotesComponent,
    ProductPageComponent,
    ViewRequestComponent,
    ViewOrderHistoryComponent,
    CreateUserComponent,
    CreateAccountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: APIInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
