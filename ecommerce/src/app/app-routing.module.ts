import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormCheckoutComponent } from './components/form-checkout/form-checkout.component';
import { HomeComponent } from './components/home/home.component';
import { ProductoDetalleComponent } from './components/producto-detalle/producto-detalle.component';
import { ProductoComponent } from './components/producto/producto.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'productos', component: ProductoComponent },
  { path: 'productos/detalle/:id', component: ProductoDetalleComponent },
  { path: 'productos/sale/form', component: FormCheckoutComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
