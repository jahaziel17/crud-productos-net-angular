import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ComunicacionesService } from 'src/app/services/comunicaciones.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-list-producto-ley',
  templateUrl: './list-producto-ley.component.html',
  styleUrls: ['./list-producto-ley.component.css']
})

export class ListProductoLeyComponent {

  constructor(public productoService: ProductoService,
    public toastr: ToastrService,
    private comunicacionesService: ComunicacionesService) { }

  ngOnInit(): void {
    this.productoService.obtenerTipoProductos();
    this.productoService.obtenerProductos();
  }

  eliminarProducto(id: number) {
    if (confirm('Esta seguro que desea eliminar el producto?')) {
      this.productoService.eliminarProducto(id).subscribe(data => {
        this.toastr.warning('Producto eliminado', 'El producto ha sido eliminado');
        this.productoService.obtenerProductos();
      });
    }
  }

  editar(producto) {
    this.comunicacionesService.mostrarAumentoStock.emit(true);
    this.productoService.actualizar(producto);
  }
}
