import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/Producto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  protected baseEndpoint = 'http://localhost:9000/api/v1/producto';
  protected cabeceras: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(protected http: HttpClient) {}

  public getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.baseEndpoint);
  }

  public getProductoById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.baseEndpoint}/${id}`);
  }

  public saveProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.baseEndpoint, producto, {
      headers: this.cabeceras,
    });
  }

  public updateProducto(producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(
      `${this.baseEndpoint}/${producto.id}`,
      producto,
      { headers: this.cabeceras }
    );
  }

  public deleteProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseEndpoint}/${id}`);
  }
}
