import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/models/Producto';
import { MercadoPagoService } from 'src/app/services/mercado-pago.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css'],
})
export class ProductoDetalleComponent implements OnInit {
  producto: Producto;
  cantidad: number;
  prefencia: any;
  init_point: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: ProductoService,
    private serviceMP: MercadoPagoService
  ) {}

  ngOnInit(): void {
    /* get(
      'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js',
      () => {}
    ); */
    this.activatedRoute.params.subscribe((params) => {
      this.service.getProductoById(params['id']).subscribe((productoEnc) => {
        this.producto = productoEnc as Producto;
      });
    });
  }

  procesarPago() {
    this.serviceMP
      .procesarPago(this.producto, this.cantidad)
      .subscribe((result) => {
        this.init_point = result.data.result;
        console.log(this.init_point);
        window.location.href = this.init_point;
      });
  }
}
