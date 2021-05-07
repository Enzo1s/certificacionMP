import { Component, OnInit } from '@angular/core';
declare var MercadoPago;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  mp = new MercadoPago('APP_USR-7eb0138a-189f-4bec-87d1-c0504ead5626');
  constructor() {}

  ngOnInit(): void {
    console.log(this.mp);
  }
}
