import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/Producto';

@Injectable({
  providedIn: 'root',
})
export class MercadoPagoService {
  protected baseEndpoint = 'http://localhost:9000/api/v1/producto';
  protected cabeceras: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  public procesarPago(producto: Producto, cantidad: number): Observable<any> {
    return this.http.post<any>(
      `${this.baseEndpoint}/sale/${cantidad}`,
      producto,
      {
        headers: this.cabeceras,
      }
    );
  }
}
