import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Producto } from 'src/app/models/Producto';

@Component({
  selector: 'app-item-producto',
  templateUrl: './item-producto.component.html',
  styleUrls: ['./item-producto.component.css'],
})
export class ItemProductoComponent implements OnInit {
  @Input() productoAux: Producto;
  @Input() index: string;
  @Output() productoSelec: EventEmitter<string>;

  constructor() {}

  ngOnInit(): void {}
}
