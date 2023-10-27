import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpErrorService {

  constructor(private toastr: ToastrService) { }

  handleHttpError(error: HttpErrorResponse): void {
    if (error.error instanceof ErrorEvent) {
      // Manejar errores de red o cliente
      this.toastr.error('Error de red o cliente', 'Error');
    } else {
      // Manejar errores del servidor
      this.toastr.error('Servicio no disponible: ' + error.message, 'Error');
    }
  }

  showErrorMessage(message: string) {
    this.toastr.error(message, 'Error');
  }
}
