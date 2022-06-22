import { Component, OnInit } from '@angular/core';
import { Marca } from 'src/app/models/marca.model';
import { Pais } from 'src/app/models/pais.model';
import { MarcaService } from 'src/app/services/marca.service';
import { PaisService } from 'src/app/services/pais.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-crud-marca',
  templateUrl: './crud-marca.component.html',
  styleUrls: ['./crud-marca.component.css']
})
export class CrudMarcaComponent implements OnInit {


  marcas :Marca[]=[];
  pais : Pais[]=[];
  filtro : string="";


marca: Marca = { 
  idMarca:0,
  nombre:"",
  descripcion:"",
 
  certificado: "",
  //fechaRegistro: new Date,
  estado:1,
  pais:{
    idPais: -1,
   
  }
};

//Declaracion de validaciones
formsRegistra = new FormGroup({
  validaNombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')]),
  validaDescripcion: new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚ.? ]{3,60}')]),
  validaCertificado: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚ.? 0-9]+$')]),
  validaPais: new FormControl('', [Validators.min(1)]),

});

//Actualizacion
formsActualiza = new FormGroup({
  validaNombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')]),
  validaDescripcion: new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚ.? ]{3,60}')]),
  validaCertificado: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚ.? 0-9]+$')]),
  validaPais: new FormControl('', [Validators.min(1)]),
  validaEstado: new FormControl('', [Validators.min(0)]),

});


//para verificar que e pulsó el boton
submitted = false;



constructor( private marcaService: MarcaService, private paisService: PaisService) { 
  this.paisService.listaPais().subscribe(
    response => this.pais = response
    

      );


 }

 
 ngOnInit(): void {
}

consulta(){
  this.marcaService.listaMarcaxnombre(this.filtro==""?"todos":this.filtro).subscribe(
        (x) => this.marcas = x
  );
}

actualizaEstado(aux : Marca){
  aux.estado = aux.estado == 0? 1 :0;
  this.marcaService.actualizarMarca(aux).subscribe();
}

 registra(){
  this.submitted = true;

  //finaliza el método si hay un error
  if (this.formsRegistra.invalid){
    return;
   }
  
      this.marcaService.registraMarca(this.marca).subscribe(
            (x) => {
              this.submitted = false;
              document.getElementById("btn_reg_cerrar")?.click();
              Swal.fire('Mensaje', x.mensaje,'success');
              this.marcaService.listaMarcaxnombre(this.filtro==""?"todos":this.filtro).subscribe(
                      (x) => this.marcas = x
              );
            } 
      );

      //limpiar los comobobox
     
     
      //limpiar los componentes del formulario a través de los ngModel

      this.marca = { 
        idMarca:0,
        nombre:"",
        descripcion:"",
        certificado: "",
       
        //fechaRegistro: new Date,
        estado:1,
        pais:{
          idPais: -1,
            
        }
      }

      

}

buscar(aux: Marca){
this.marca  = aux;
}
actualiza(){
  this.submitted = true;

  //finaliza el método si hay un error
  if (this.formsActualiza.invalid){
   return;
  }
 

 
      this.marcaService.actualizarMarca(this.marca).subscribe(
            (x) => {
              document.getElementById("btn_act_cerrar")?.click();
              Swal.fire('Mensaje', x.mensaje,'success');
              this.marcaService.listaMarcaxnombre(this.filtro==""?"todos":this.filtro).subscribe(
                      (x) => this.marcas = x
              );
            } 
      );

      //limpiar los comobobox
     
     
      //limpiar los componentes del formulario a través de los ngModel

      this.marca = { 
        idMarca:0,
        nombre:"",
        descripcion:"",
        certificado: "",
        fechaVigencia: new Date,
        //fechaRegistro: new Date,
        estado:1,
        pais:{
          idPais: -1,
            
        }
      }
      

}


elimina(aux :Marca){
  Swal.fire({
        title: '¿Estás Seguro?',
        text: "¡No se puede revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, Elimínalo'
  }).then((result) => {
      if (result.isConfirmed) {
            this.marcaService.eliminarMarca(aux.idMarca).subscribe(
              (x) => {
                Swal.fire('Mensaje',x.mensaje, 'success');
                this.marcaService.listaMarcaxnombre(this.filtro==""?"todos":this.filtro).subscribe(
                        (x) => this.marcas = x
                );
       
              } 
            );
      }
  })
}

 

 limpiar(){
  {
    this.marca={
      idMarca: 0,
      nombre: "",
      descripcion: "",
      certificado: "",
      
      //fechaVigencia: new Date,
      estado: 1,
  
      pais: {
        idPais: -1,
      
    }
    
  }

 }
}




}