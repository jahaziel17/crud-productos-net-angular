import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionesService {

  mostrarAumentoStock: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }
}
