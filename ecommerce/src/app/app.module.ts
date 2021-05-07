import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ItemProductoComponent } from './components/item-producto/item-producto.component';
import { ProductoComponent } from './components/producto/producto.component';
import { ProductoDetalleComponent } from './components/producto-detalle/producto-detalle.component';
import { FormCheckoutComponent } from './components/form-checkout/form-checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ItemProductoComponent,
    ProductoComponent,
    ProductoDetalleComponent,
    FormCheckoutComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
