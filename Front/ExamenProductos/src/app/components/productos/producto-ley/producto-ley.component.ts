import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { productoley } from 'src/app/models/productoley';
import { DatePipe } from '@angular/common';
import { ComunicacionesService } from 'src/app/services/comunicaciones.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-producto-ley',
  templateUrl: './producto-ley.component.html',
  styleUrls: ['./producto-ley.component.css'],
  providers: [DatePipe] // Añadir DatePipe a los providers del componente
})
export class ProductoLeyComponent implements OnInit, OnDestroy {

  form: FormGroup;
  suscription: Subscription;
  producto: productoley;
  idProducto = 0;
  mostrardiv = false;
  aumentostock: number = 0;
  fechaActual: Date;
  fechaActualForm;

  constructor(private formBuilder: FormBuilder,
    public productoService: ProductoService,
    private toastr: ToastrService,
    private comunicacionesService: ComunicacionesService,
    private datePipe: DatePipe) {

    this.fechaActual = new Date();
    this.fechaActualForm = this.datePipe.transform(this.fechaActual, 'yyyy-MM-dd');

    this.form = this.formBuilder.group({
      id: 0,
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      existencia: ['', [Validators.required]],
      tipoproducto: ['', [Validators.required]],
      sumaStock: []
    })

  }

  ngOnInit(): void {

    this.comunicacionesService.mostrarAumentoStock.subscribe(
      mostrar => {
        this.mostrardiv = mostrar;
      }
    );

    this.suscription = this.productoService.obtenerProducto$().subscribe(data => {
      this.producto = data;
      this.form.patchValue({
        nombre: this.producto.nombreProducto,
        descripcion: this.producto.descripcionProducto,
        precio: this.producto.precio,
        existencia: this.producto.existencia,
        tipoproducto: this.producto.tipoProducto_Id

      });
      this.idProducto = this.producto.id;

    });

    this.idProducto = 0; 
  }

  ngOnDestroy(): void {

    this.suscription.unsubscribe();

  }

  guardarproducto() {

    if (this.idProducto === 0) {
      this.agregar();
    } else {

      this.editar();
    }

  }

  agregar() {
    try {
      
      const producto: productoley = {
        id: 0,
        nombreProducto: this.form.get('nombre')?.value,
        descripcionProducto: this.form.get('descripcion')?.value,
        precio: this.form.get('precio')?.value,
        existencia: this.form.get('existencia')?.value,
        tipoProducto_Id: this.form.get('tipoproducto')?.value,
        fechaRegistro: this.fechaActualForm,
        fechaEliminado: '1900-01-01'

      }
      this.productoService.guardarproducto(producto).subscribe(data => {
        this.toastr.success('Producto Agregado', 'El producto fue agregado a la lista');
        this.productoService.obtenerProductos();
        this.form.reset();
      });
    } catch (error) {
      console.log('es el error' + error);
    }

  }

  editar() {

    if (this.form.get('sumaStock')?.value !== null) {
      this.aumentostock = parseInt(this.form.get('sumaStock')?.value);
    }

    

    const producto: productoley = {
      id: this.producto.id,
      nombreProducto: this.form.get('nombre')?.value,
      descripcionProducto: this.form.get('descripcion')?.value,
      precio: this.form.get('precio')?.value,
      existencia: parseInt(this.form.get('existencia')?.value) + this.aumentostock,
      tipoProducto_Id: this.form.get('tipoproducto')?.value,
      fechaRegistro: this.fechaActualForm,
      fechaEliminado: '1900-01-01'
    };

    this.productoService.actualizarproducto(this.idProducto, producto).subscribe(data => {
      this.toastr.info('Producto actualizado', 'El producto fue actualizado en la lista');
      this.productoService.obtenerProductos();
      this.form.reset();

      this.idProducto = 0;
      this.aumentostock = 0;
    })
    this.mostrardiv = false;
  }

  //solo numeros 
  numeroCampo: string = '';
  soloNumeros(event: KeyboardEvent) {
    const inputChar = String.fromCharCode(event.charCode);

    // Utiliza una expresión regular para permitir solo números
    if (!/^[0-9]*$/.test(inputChar)) {
      event.preventDefault();
    }
  }
}
