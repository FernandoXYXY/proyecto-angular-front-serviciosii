import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { Ubigeo } from 'src/app/models/ubigeo.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { UbigeoService } from 'src/app/services/ubigeo.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-crud-cliente',
  templateUrl: './crud-cliente.component.html',
  styleUrls: ['./crud-cliente.component.css']
})
export class CrudClienteComponent implements OnInit {

  //Para la Grilla
  clientes: Cliente [] = [];
  filtro: string ="";

  //Para el ubigeo
  departamentos: string[] = [];;
  provincias: string[] = [];;
  distritos: Ubigeo[] = [];;

  
 //Json para registrar o actualizar
 cliente: Cliente = { 
   idCliente:0,
   nombres:"",
   apellidos:"",
   dni:"",
   correo:"",
   direccion:"",
   estado:1,
   ubigeo:{
     idUbigeo: -1,
     departamento:"-1",
     provincia:"-1",
     distrito:"-1",
   }
 };

 //Declaracion de validaciones
   formsRegistra = new FormGroup({
     validaNombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')]),
     validaApellido: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')]),
     validaDni: new FormControl('', [Validators.required,Validators.pattern('[0-9]{8}')]),
     validaCorreo: new FormControl('', [Validators.required, Validators.pattern('^[^@]+@[^@]+\.[a-zA-Z]{2,}$')]),
     validaDireccion: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚ.? 0-9-]+$')]),
     validaDepartamento: new FormControl('', [Validators.min(1)]),
     validaProvincia: new FormControl('', [Validators.min(1)]),
     validaDistrito: new FormControl('', [Validators.min(1)]),
 });

 formsActualiza = new FormGroup({
  validaNombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')]),
  validaApellido: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')]),
  validaDni: new FormControl('', [Validators.required,Validators.pattern('[0-9]{8}')]),
  validaCorreo: new FormControl('', [Validators.required, Validators.pattern('^[^@]+@[^@]+\.[a-zA-Z]{2,}$')]),
  validaDireccion: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚ.? 0-9-]+$')]),
  validaDepartamento: new FormControl('', [Validators.min(1)]),
  validaProvincia: new FormControl('', [Validators.min(1)]),
  validaDistrito: new FormControl('', [Validators.min(1)]),
  validaEstado: new FormControl('', [Validators.min(0)]),
 });

 //para verificar que e pulsó el boton
 submitted = false;

 constructor(private clienteService:ClienteService, private ubigeoService:UbigeoService) {
     this.ubigeoService.listarDepartamento().subscribe(
         response => this.departamentos = response
     );            
 }

 cargaProvincia(){
     this.ubigeoService.listaProvincias(this.cliente.ubigeo?.departamento).subscribe(
       response =>  this.provincias= response
     );

     this.cliente!.ubigeo!.provincia = "-1";
     this.distritos = [];
     this.cliente!.ubigeo!.idUbigeo = -1;

 }

 cargaDistrito(){
   this.ubigeoService.listaDistritos(this.cliente.ubigeo?.departamento, this.cliente.ubigeo?.provincia).subscribe(
     response =>  this.distritos= response
    );

    this.cliente!.ubigeo!.idUbigeo = -1;
  }

 ngOnInit(): void {
 }

 consulta(){
     this.clienteService.listacrudCliente(this.filtro==""?"todos":this.filtro).subscribe(
           (x) => this.clientes = x
     );
 }

 actualizaEstado(aux : Cliente){
       aux.estado = aux.estado == 0? 1 :0;
       this.clienteService.actualizaCliente(aux).subscribe();
 }

 registra(){
      this.submitted = true;

       //finaliza el método si hay un error
       if (this.formsRegistra.invalid){
        return;
       }
       
       this.submitted = false;

       this.clienteService.registraCliente(this.cliente).subscribe(
             (x) => {
               document.getElementById("btn_reg_cerrar")?.click();
               Swal.fire('Mensaje', x.mensaje,'success');
               this.clienteService.listacrudCliente(this.filtro==""?"todos":this.filtro).subscribe(
                       (x) => this.clientes = x
               );

             } 
       );

       //limpiar los comobobox
       this.distritos = [];
       this.provincias = [];

       //limpiar los componentes del formulario a través de los ngModel

       this.cliente = { 
             idCliente:0,
             nombres:"",
             apellidos:"",
             dni:"",
             correo:"",
             direccion:"",
             estado:1,
             ubigeo:{
               idUbigeo: -1,
               departamento:"-1",
               provincia:"-1",
               distrito:"-1",
             }
       }
 }

 buscar(aux :Cliente){
       this.cliente  = aux;

       this.ubigeoService.listaProvincias(this.cliente.ubigeo?.departamento).subscribe(
         response =>  this.provincias= response
       );

     this.ubigeoService.listaDistritos(this.cliente.ubigeo?.departamento, this.cliente.ubigeo?.provincia).subscribe(
       response =>  this.distritos= response
     );

 }


 actualiza(){
   this.submitted = true;

   //finaliza el método si hay un error
   if (this.formsActualiza.invalid){
    return;
   }

   this.submitted = false;

   this.clienteService.actualizaCliente(this.cliente).subscribe(
         (x) => {
           document.getElementById("btn_act_cerrar")?.click();
           Swal.fire('Mensaje', x.mensaje,'success');
           this.clienteService.listacrudCliente(this.filtro==""?"todos":this.filtro).subscribe(
                   (x) => this.clientes = x
           );
         } 
   );

   //limpiar los comobobox
   this.distritos = [];
   this.provincias = [];

   //limpiar los componentes del formulario a través de los ngModel

   this.cliente = { 
         idCliente:0,
         nombres:"",
         apellidos:"",
         dni:"",
         correo:"",
         direccion:"",
         estado:1,
         ubigeo:{
           idUbigeo: -1,
           departamento:"-1",
           provincia:"-1",
           distrito:"-1",
         }
   }
}



elimina(aux :Cliente){
     Swal.fire({
           title: '¿Estás Seguro?',
           text: "¡No se puede revertir!",
           icon: 'warning',
           showCancelButton: true,
           confirmButtonColor: '#3085d6',
           cancelButtonColor: '#d33',
           confirmButtonText: 'Sí, Eliminar',
          cancelButtonText:'Cancelar'
     }).then((result) => {
         if (result.isConfirmed) {
               this.clienteService.eliminaCliente(aux.idCliente).subscribe(
                 (x) => {
                   Swal.fire('Mensaje',x.mensaje, 'success');
                   this.clienteService.listacrudCliente(this.filtro==""?"todos":this.filtro).subscribe(
                           (x) => this.clientes = x
                   );
          
                 } 
               );
         }
     })
}

limpiar(){
  this.cliente = { 
    idCliente:0,
    nombres:"",
    apellidos:"",
    dni:"",
    correo:"",
    direccion:"",
    estado:1,
    ubigeo:{
      idUbigeo: -1,
      departamento:"-1",
      provincia:"-1",
      distrito:"-1",
    }
}
}

}
