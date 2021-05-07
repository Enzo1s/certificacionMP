import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/Producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
})
export class ProductoComponent implements OnInit {
  productos: Producto[] = [];
  constructor(private service: ProductoService, private router: Router) {}

  ngOnInit(): void {
    this.service.getProductos().subscribe((data) => {
      this.productos = data;
      /* for (let producto in data) {
        this.productos.push(data[producto as keyof object]);
      } */
    });
  }

  public verProductos(id: string) {
    this.router.navigate(['/productos/detalle', id]);
  }
}
