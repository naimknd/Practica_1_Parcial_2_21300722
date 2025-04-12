import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://localhost:3000/api/productos'; // Backend API URL

  // Producto de respaldo
  private productoRespaldo: Producto = new Producto(
    1,
    'Adidas Superstar XLG',
    2599.99,
    'assets/adidas_superstar_xlg.jpg',
    1,
    10
  );

  constructor(private http: HttpClient) {}

  // Obtener todos los productos de la API
  obtenerProducto(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error obteniendo productos de la API:', error);
        // Retornar el producto de respaldo en caso de error
        return of([this.productoRespaldo]);
      })
    );
  }
}