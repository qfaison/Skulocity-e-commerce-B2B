import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TableModule } from 'primeng/table';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-tabset';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APIInterceptor } from './interceptor.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './dashboard/home/home.component';
import { ContactUsComponent } from './dashboard/contact-us/contact-us.component';
import { AboutUsComponent } from './dashboard/about-us/about-us.component';
import { WholesaleComponent } from './dashboard/wholesale/wholesale.component';
import { AffiliatesComponent } from './dashboard/affiliates/affiliates.component';
import { FaqComponent } from './dashboard/faq/faq.component';
import { CatalogComponent } from './dashboard/catalog/catalog.component';
import { QuickAddComponent } from './dashboard/quick-add/quick-add.component';
import { OrderHistoryComponent } from './dashboard/order-history/order-history.component';
import { ShoppingListComponent } from './dashboard/shopping-list/shopping-list.component';
import { RequestsComponent } from './dashboard/requests/requests.component';
import { QuotesComponent } from './dashboard/quotes/quotes.component';
import { MessagesComponent } from './dashboard/messages/messages.component';
import { CategoryComponent } from './dashboard/category/category.component';
import { ViewQuotesComponent } from './dashboard/view-quotes/view-quotes.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContactUsComponent,
    AboutUsComponent,
    WholesaleComponent,
    AffiliatesComponent,
    FaqComponent,
    CatalogComponent,
    QuickAddComponent,
    OrderHistoryComponent,
    ShoppingListComponent,
    RequestsComponent,
    QuotesComponent,
    MessagesComponent,
    CategoryComponent,
    ViewQuotesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    TableModule,
    TabsModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: APIInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
