import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Cliente } from 'src/app/models/cliente.model';
import { Reclamo } from 'src/app/models/reclamo.model';
import { TipoReclamo } from 'src/app/models/tipo-reclamo.model';
import { ReclamoService } from 'src/app/services/reclamo.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TipoReclamoService } from 'src/app/services/tipo-reclamo.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crud-reclamo',
  templateUrl: './crud-reclamo.component.html',
  styleUrls: ['./crud-reclamo.component.css']
})
export class CrudReclamoComponent implements OnInit {


  //para llenar los combos 
  tipoReclamo: TipoReclamo[] = [];
  cliente: Cliente[] = [];

  //ng model para registrar o actualizar
  ngReclamo: Reclamo = {
      descripcion:"",
      tipoReclamo:{
        idTipoReclamo:-1
      },
      cliente:{
        idCliente:-1
      }
  };

  //para el filtro
  fechaC:string ="";
  idClienteC:number=-1;
  idTipoC:number=-1;
  estadoC:number=-1;

  //para la tabla
  reclamos:Reclamo[] = [];


  //para la validacion
  submitted = false;
  //validacion para registrar

  forms = new FormGroup({
    validaFecha: new FormControl('',[Validators.required]),
    validaDescripcion: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ.? 0-9-]+$')]),
    validaCliente: new FormControl('', [Validators.min(1)]),
    validaTipoReclamo: new FormControl('', [Validators.min(1)]),
  });


  forms2 = new FormGroup({
    validaFecha2: new FormControl('',[Validators.required]),
    validaDescripcion2: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ.? 0-9-]+$')]),
    validaCliente2: new FormControl('', [Validators.min(1)]),
    validaTipoReclamo2: new FormControl('', [Validators.min(1)]),
  });
  

  constructor(private tipoReclamoService:TipoReclamoService, private reclamoService:ReclamoService, private clienteService:ClienteService) { 
    this.tipoReclamoService.listaTipoReclamo().subscribe(
      (x) => this.tipoReclamo = x
    );

    this.clienteService.listaCliente().subscribe(
      (c) => this.cliente = c
    );

  }

  ngOnInit(): void {
  }

  consulta(){

    this.reclamoService.consultaReclamo(this.estadoC, this.fechaC, this.idClienteC, this.idTipoC).subscribe(
      (x) => {
        this.reclamos = x.lista;
       
      }
    );
  }


  insertado(){

    // 
    this.submitted = true;

    //valida el formulario
    if(this.forms.invalid){
      return; //si el formulario es invalido no ejecuta lo que sigue
    }

    //registra
    this.reclamoService.insertaReclamo(this.ngReclamo).subscribe(
      (x) => {
        document.getElementById("btn_reg_cerrar")?.click();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: x.mensaje,
          showConfirmButton: true
        })
        this.reclamoService.consultaReclamo(this.estadoC, this.fechaC, this.idClienteC, this.idTipoC).subscribe(
          (r) => this.reclamos = r.lista
        );

        this.submitted = false;
      }
    );
    
    //limpiar el ngmodel
    this.ngReclamo = {
      descripcion:"",
      tipoReclamo:{
        idTipoReclamo:-1
      },
      cliente:{
        idCliente:-1
      }
    } 


 }

 actualiza(){
  // 
  this.submitted = true;

  //valida el formulario
  if(this.forms2.invalid){
    return; //si el formulario es invalido no ejecuta lo que sigue
  }

  //registra
  this.reclamoService.actualizarReclamo(this.ngReclamo).subscribe(
    (x) => {
      document.getElementById("btn_act_cerrar")?.click();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: x.mensaje,
        showConfirmButton: true
      })
      this.reclamoService.consultaReclamo(this.estadoC, this.fechaC, this.idClienteC, this.idTipoC).subscribe(
        (r) => this.reclamos = r.lista
      );

      this.submitted = false;
    }
  );
  
  //limpiar el ngmodel
  this.ngReclamo = {
    descripcion:"",
    tipoReclamo:{
      idTipoReclamo:-1
    },
    cliente:{
      idCliente:-1
    }
  }
 }

 limpiar(){
  this.ngReclamo = {
    descripcion:"",
    tipoReclamo:{
      idTipoReclamo:-1
    },
    cliente:{
      idCliente:-1
    }
  } 
 }

 elimiarOactivar(aux: Reclamo){

    if(aux.estado == 1){
      Swal.fire({
        title: '¿Estas seguro de eliminar?',
        text: "Esta operación podria no revertirse",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, eliminar!'
        }).then((result) => {
        if (result.isConfirmed) {
          this.reclamoService.elinarReclamo(aux.idReclamo).subscribe(x => {
            Swal.fire('mensaje', x.mensaje, 'success');
            this.reclamoService.consultaReclamo(this.estadoC, this.fechaC, this.idClienteC, this.idTipoC).subscribe(
              (r) => this.reclamos = r.lista
            );
          });
        }
      })
    }else{
      Swal.fire({
        title: '¿Estas seguro de activar este registro?',
        text: "Esta operación cambiará el estado a 'Activo'",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, activar!'
        }).then((result) => {
        if (result.isConfirmed) {
          this.reclamoService.activarReclamo(aux).subscribe(x => {
            Swal.fire('mensaje', x.mensaje, 'success');
            this.reclamoService.consultaReclamo(this.estadoC, this.fechaC, this.idClienteC, this.idTipoC).subscribe(
              (r) => this.reclamos = r.lista
            );
          });
        }
      })
    }
 }


 buscar(aux: Reclamo){
  this.ngReclamo  = aux;
}

}
