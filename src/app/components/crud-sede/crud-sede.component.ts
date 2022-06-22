import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Pais } from 'src/app/models/pais.model';
import { Sede } from 'src/app/models/sede.model';
import { PaisService } from 'src/app/services/pais.service';
import { SedeService } from 'src/app/services/sede.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crud-sede',
  templateUrl: './crud-sede.component.html',
  styleUrls: ['./crud-sede.component.css']
})
export class CrudSedeComponent implements OnInit {

  //Para el listado de sedes
  sedes: Sede[] = [];
  nombre: string = "";
  paises: Pais[] = [];
 
  //Json para registrar o actualizar una sede
  sede: Sede = {
    idSede: 0,
    nombre: "",
    direccion: "",
    codigoPostal: "",
    estado: 1,
    pais: {
      idPais: -1,
    }
  }

  //Declaracion de validaciones
  formsRegistra = new FormGroup({
    validaNombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')]),
    validaDireccion: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚ.? 0-9-]+$')]),
    validaCodigoPostal: new FormControl('', [Validators.required, Validators.pattern('[0-9]{5}')]),
    validaPais: new FormControl('', [Validators.required, Validators.min(1)])
  });

  formsActualiza = new FormGroup({
    validaNombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')]),
    validaDireccion: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚ.? 0-9-]+$')]),
    validaCodigoPostal: new FormControl('', [Validators.required, Validators.pattern('[0-9]{5}')]),
    validaPais: new FormControl('', [Validators.required, Validators.min(1)]),
    validaEstado: new FormControl('', [Validators.required, Validators.min(1)])
  });

  //para verificar que e pulsó el boton
  submitted = false;

  constructor(private sedeService: SedeService,
              private paisService: PaisService) {
      this.paisService.listaPais().subscribe(x => this.paises = x);
  }

  ngOnInit(): void {
  }

  consultaSede(): void {
    this.sedeService.listaSedeCrud(this.nombre == "" ? "todos": this.nombre).subscribe(x => this.sedes = x);
  }
  actualizaEstado(aux: Sede){
    aux.estado = aux.estado == 1 ? 0 : 1;
    this.sedeService.actualizaSede(aux).subscribe();
  }
  registra(){
    this.submitted = true;

    if (this.formsRegistra.invalid) {
      return;
    }
    this.submitted = false;

    this.sedeService.registraSede(this.sede).subscribe(x => {
      document.getElementById("btn_reg_cerrar")?.click();
      Swal.fire('mensaje', x.mensaje, 'success');
      this.sedeService.listaSedeCrud(this.nombre == ""? "todos":this.nombre).subscribe(y => this.sedes = y);
    });

    this.sede = {
      idSede: 0,
      nombre: "",
      direccion: "",
      codigoPostal: "",
      estado: 1,
      pais: {
        idPais: -1,
      }
    }



  }
  //4

  buscar(aux :Sede){
    this.sede = aux;
  }
  actualiza(){
    this.submitted = true;
    
    if (this.formsActualiza.invalid) {
      
      return;
    }
    
    this.submitted = false; 

    this.sedeService.actualizaSede(this.sede).subscribe(x => {
      document.getElementById("btn_act_cerrar")?.click();
      Swal.fire('mensaje', x.mensaje, 'success');
      this.sedeService.listaSedeCrud(this.nombre == ""? "todos":this.nombre).subscribe(y => this.sedes = y);
    });

 
    this.sede = {
      idSede: 0,
      nombre: "",
      direccion: "",
      codigoPostal: "",
      estado: 1,
      pais: {
        idPais: -1,
      }}
    
  }

  elimina(aux: Sede){
    Swal.fire({
      title: 'Estas seguro?',
      text: "No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, eliminar!'
      }).then((result) => {
      if (result.isConfirmed) {
        this.sedeService.eliminaSede(aux.idSede).subscribe(x => {
          Swal.fire('mensaje', x.mensaje, 'success');
          this.sedeService.listaSedeCrud(this.nombre == ""? "todos":this.nombre).subscribe(y => this.sedes = y);
        });
      }
    })
  }

  limpiar(){
    
    this.sede = {
      idSede: 0,
      nombre: "",
      direccion: "",
      codigoPostal: "",
      estado: 1,
      pais: {
        idPais: -1,
      }}
    
  }


}
