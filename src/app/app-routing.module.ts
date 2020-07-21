import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './login/dashboard/dashboard.component';
import { IndexComponent } from './login/dashboard/index/index.component';
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
import { AuthGuardGuard } from './login/auth-guard.guard';
import { ViewQuotesComponent } from './login/dashboard/quotes/view-quotes/view-quotes.component';
import { ProductPageComponent } from './login/dashboard/product-page/product-page.component';
import { ViewRequestComponent } from './login/dashboard/requests/view-request/view-request.component';
import { ViewOrderHistoryComponent } from './login/dashboard/order-history/view-order-history/view-order-history.component';


const routes: Routes = [
  { path:'', component: LoginComponent },
  { path:'dashboard', component: DashboardComponent, canActivate: [AuthGuardGuard], children: [
    { path:'', component: ShopAllComponent },
    { path:'home', component: IndexComponent },
    { path:'shopAll', component: ShopAllComponent },
    { path:'keratin', component: KeratinComponent },
    { path:'faq', component: FaqComponent },
    { path:'about', component: AboutComponent },
    { path:'contact', component: ContactComponent },
    { path:'profile', component: MyProfileComponent },
    { path:'quickAdd', component: QuickAddComponent },
    { path:'orderHistory', component: OrderHistoryComponent },
    { path:'shoppingList', component: ShoppingListComponent },
    { path:'requests', component: RequestsComponent },
    { path:'quotes', component: QuotesComponent },
    { path:'view-quotes/:quoteId', component: ViewQuotesComponent },
    { path:'messages', component: MessagesComponent },
    { path:'product-page/:productId/:isVarient', component: ProductPageComponent},
    { path:'view-request/:requestId', component: ViewRequestComponent},
    { path:'view-order/:ordrid', component: ViewOrderHistoryComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
