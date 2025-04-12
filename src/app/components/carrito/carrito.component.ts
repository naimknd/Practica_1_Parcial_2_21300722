import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito.service';
import { Router } from '@angular/router'; // Importar Router para la navegación

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  carrito: any[] = [];
  recibo: string = ''; // Variable para almacenar el recibo
  
  constructor(private carritoService: CarritoService, private router: Router) {} // Inyectar Router

  ngOnInit() {
    this.carrito = this.carritoService.obtenerCarrito();
  }

  eliminarProducto(index: number) {
    this.carritoService.eliminarProducto(index);
  }

  generarXML() {
    this.recibo = this.carritoService.generarXML(); // Almacena el recibo generado
  }

  calcularTotal() {
    return this.carrito.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
}

  descargarXML() {
    const xmlData = this.carritoService.generarXML(); // Genera el XML
    const blob = new Blob([xmlData], { type: 'application/xml' }); // Crea un Blob
    const url = window.URL.createObjectURL(blob); // Crea una URL para el Blob

    const a = document.createElement('a'); // Crea un elemento <a>
    a.href = url; // Asigna la URL al href
    a.download = 'recibo.xml'; // Nombre del archivo a descargar
    document.body.appendChild(a); // Añade el elemento al DOM
    a.click(); // Simula un clic para iniciar la descarga
    document.body.removeChild(a); // Elimina el elemento del DOM
    window.URL.revokeObjectURL(url); // Libera la URL del Blob
  }

  irAProductos() {
    this.router.navigate(['/productos']); // Navegar a la lista de productos
  }
}