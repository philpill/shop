import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BasketComponent } from './basket/basket.component';
import { FooterComponent } from './footer/footer.component';
import { ProductsComponent } from './products/products.component';
import { ShopComponent } from './shop/shop.component';
import { ProfileComponent } from './profile/profile.component';
import { OrdersComponent } from './orders/orders.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BasketComponent,
    FooterComponent,
    ProductsComponent,
    ShopComponent,
    ProfileComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
        { path: '', component: ShopComponent },
        { path: 'profile', component: ProfileComponent },
        { path: 'orders', component: OrdersComponent },
      ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
