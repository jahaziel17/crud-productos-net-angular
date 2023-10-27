import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { productoley } from '../models/productoley';
import { BehaviorSubject, Observable } from 'rxjs';
import { tipoproducto } from '../models/tipoproducto';
import { HttpErrorService } from '../services/http-error-service.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  myAppUrl = 'https://localhost:44302/';
  myApiUrl = 'api/Producto/';
  myApiUrlTipoProducto = 'api/TiposProductos/';
  list: productoley[];
  listtipo: tipoproducto[];
  listjoin: any[];
  private actualizarProducto = new BehaviorSubject<productoley>({} as any);

  constructor(private http: HttpClient,
    private httpErrorService: HttpErrorService,
    private toastr: ToastrService) { }

  guardarproducto(producto: productoley): Observable<productoley> {
    return this.http.post<productoley>(this.myAppUrl + this.myApiUrl, producto).pipe(
      catchError((error: HttpErrorResponse) => {
        this.httpErrorService.showErrorMessage('Ocurrió un error al guardar producto. Por favor, inténtalo de nuevo.');
        return throwError('Ocurrió un error en la solicitud. Por favor, inténtalo de nuevo.');
      })
    );
  }

  obtenerProductos() {

    this.http.get(this.myAppUrl + this.myApiUrl).subscribe(
      (response) => {
        this.list = response as productoley[];
        this.listjoin = this.list.map(objProducto => {
          const objTipoP = this.listtipo.find(objTipoP => objTipoP.id === objProducto.tipoProducto_Id);
          return {
            id: objProducto.id,
            nombreProducto: objProducto.nombreProducto,
            descripcionProducto: objProducto ? objProducto.descripcionProducto : null,
            precio: objProducto ? objProducto.precio : null,
            existencia: objProducto ? objProducto.existencia : null,
            nombreTipoProducto: objTipoP ? objTipoP.nombreTipoProducto : null,
            fechaRegistro: objProducto ? objProducto.fechaRegistro : null,
            tipoProducto_Id: objProducto ? objProducto.tipoProducto_Id : null,
          };
        });
      },
      (error) => {
        // Manejar el error utilizando el servicio HttpErrorService
        this.httpErrorService.handleHttpError(error);
      }
    );
  }

  eliminarProducto(id: number): Observable<productoley> {
    return this.http.delete<productoley>(this.myAppUrl + this.myApiUrl + id).pipe(
      catchError((error: HttpErrorResponse) => {
        this.httpErrorService.showErrorMessage('Ocurrió un error al eliminar producto. Por favor, inténtalo de nuevo.');
        return throwError('Ocurrió un error en la solicitud. Por favor, inténtalo de nuevo.');
      })
    );
  }

  //para actualizar producto
  actualizar(producto) {
    this.actualizarProducto.next(producto);
  }

  obtenerProducto$(): Observable<productoley> {
    return this.actualizarProducto.asObservable();
  }

  //actualizar el producto (put)
  actualizarproducto(id: number, producto: productoley): Observable<productoley> {
    return this.http.put<productoley>(this.myAppUrl + this.myApiUrl + id, producto)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.httpErrorService.showErrorMessage('Ocurrió un error al actualizar el producto. Por favor, inténtalo de nuevo.');
          return throwError('Ocurrió un error en la solicitud. Por favor, inténtalo de nuevo.');
        })
      );
  }

  //obtener el tipo de producto
  obtenerTipoProductos() {

    this.http.get(this.myAppUrl + this.myApiUrlTipoProducto).subscribe(
      (response) => {
        this.listtipo = response as tipoproducto[];
      },
      (error) => {
        this.httpErrorService.handleHttpError(error);
      }
    );
  }

  //manejo de errores
  private handleError(error: HttpErrorResponse) {
    console.error('Error:', error);
    return throwError('Ocurrió un error en la solicitud. Por favor, inténtalo de nuevo.');
  }

}
