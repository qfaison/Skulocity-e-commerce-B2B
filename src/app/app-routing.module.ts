import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
import { AuthGuardServiceGuard } from './auth-guard-service.guard';
import { CategoryComponent } from './dashboard/category/category.component';
import { ViewQuotesComponent } from './dashboard/view-quotes/view-quotes.component';


const routes: Routes = [
  { path: 'customerPartyId=?', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardServiceGuard] ,children:[
    { path: '', component: QuickAddComponent},
    { path: 'orderHistory', component: OrderHistoryComponent},
    { path: 'shoppingList', component: ShoppingListComponent},
    { path: 'request', component: RequestsComponent},
    { path: 'quotes', component: QuotesComponent},
    { path: 'messages', component: MessagesComponent}, 
    { path: 'home', component: HomeComponent},
    { path: 'contact', component: ContactUsComponent},
    { path: 'about', component: AboutUsComponent},
    { path: 'wholesale', component: WholesaleComponent},
    { path: 'affiliates', component: AffiliatesComponent},
    { path: 'faq', component: FaqComponent},
    { path: 'catalog/:catalogId', component: CatalogComponent},
    { path: 'category/:categoryId', component: CategoryComponent},
    { path: 'viewQuotes/:quoteId', component: ViewQuotesComponent}
  ] },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: "**", redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
