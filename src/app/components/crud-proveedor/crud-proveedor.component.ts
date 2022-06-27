import { Component, OnInit } from '@angular/core';
import { Proveedor } from 'src/app/models/proveedor.model';
import { Ubigeo } from 'src/app/models/ubigeo.model';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { UbigeoService } from 'src/app/services/ubigeo.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crud-proveedor',
  templateUrl: './crud-proveedor.component.html',
  styleUrls: ['./crud-proveedor.component.css']
})
export class CrudProveedorComponent implements OnInit {

 //Para la Grilla
 proveedores: Proveedor [] = [];
 filtro: string ="";

 //Para el ubigeo
 departamentos: string[] = [];;
 provincias: string[] = [];;
 distritos: Ubigeo[] = [];;

 
//Json para registrar o actualizar
proveedor: Proveedor = { 
  idProveedor:0,
  razonsocial:"",
  ruc:"",
  direccion: "",
  telefono: "",
  celular: "",
  contacto: "",
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
  validaRazon: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{5,20}')]),
  validaRuc: new FormControl('', [Validators.required,Validators.pattern('[0-9]{11}')]),
  validaDireccion: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]{5,20}')]),
  validaTelefono: new FormControl('', [Validators.required,Validators.pattern('[0-9]{8}')]),
  validaCelular: new FormControl('', [Validators.required,Validators.pattern('[0-9]{8}')]),
  validaContacto: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]{5,20}')]),
  validaDepartamento: new FormControl('', [Validators.min(1)]),
  validaProvincia: new FormControl('', [Validators.min(1)]),
  validaDistrito: new FormControl('', [Validators.min(1)]),
});

formsActualiza = new FormGroup({
  validaRazon: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{5,20}')]),
  validaRuc: new FormControl('', [Validators.required,Validators.pattern('[0-9]{11}')]),
  validaDireccion: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]{5,20}')]),
  validaTelefono: new FormControl('', [Validators.required,Validators.pattern('[0-9]{8}')]),
  validaCelular: new FormControl('', [Validators.required,Validators.pattern('[0-9]{8}')]),
  validaContacto: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]{5,20}')]),
  validaDepartamento: new FormControl('', [Validators.min(1)]),
  validaProvincia: new FormControl('', [Validators.min(1)]),
  validaDistrito: new FormControl('', [Validators.min(1)]),
  validaEstado: new FormControl('', [Validators.min(0)]),
});

//para verificar que e pulsó el boton
submitted = false;

constructor(private proveedorService:ProveedorService, private ubigeoService:UbigeoService) {
    this.ubigeoService.listarDepartamento().subscribe(
        response => this.departamentos = response
    );            
}

cargaProvincia(){
    this.ubigeoService.listaProvincias(this.proveedor.ubigeo?.departamento).subscribe(
      response =>  this.provincias= response
    );

    this.proveedor!.ubigeo!.provincia = "-1";
    this.distritos = [];
    this.proveedor!.ubigeo!.idUbigeo = -1;

}

cargaDistrito(){
  this.ubigeoService.listaDistritos(this.proveedor.ubigeo?.departamento, this.proveedor.ubigeo?.provincia).subscribe(
    response =>  this.distritos= response
   );

   this.proveedor!.ubigeo!.idUbigeo = -1;
 }

ngOnInit(): void {
}

consulta(){
    this.proveedorService.consultaProveedor(this.filtro==""?"todos":this.filtro).subscribe(
          (x) => this.proveedores = x
    );
}

actualizaEstado(aux : Proveedor){
      aux.estado = aux.estado == 0? 1 : 0;//0? 1 : 0;
      this.proveedorService.actualizaProveedor(aux).subscribe();
}

registra(){

  this.submitted = true;

  //finaliza el método si hay un error
  if (this.formsRegistra.invalid){
    return;
  }
      this.proveedorService.registraProveedor(this.proveedor).subscribe(
            (x) => {
              this.submitted = false;
              alert(x.mensaje);
              this.proveedorService.consultaProveedor(this.filtro==""?"todos":this.filtro).subscribe(
                      (x) => this.proveedores = x
              );
            } 
      );

      //limpiar los comobobox
      this.distritos = [];
      this.provincias = [];

      //limpiar los componentes del formulario a través de los ngModel

      this.proveedor = { 
        idProveedor:0,
        razonsocial:"",
        ruc:"",
        direccion: "",
        telefono: "",
        celular: "",
        contacto: "",
        estado:1,
          ubigeo:{
            idUbigeo: -1,
            departamento:"-1",
            provincia:"-1",
            distrito:"-1",
        }
      }
}
buscar(aux : Proveedor){
      this.proveedor  = aux;

      this.ubigeoService.listaProvincias(this.proveedor.ubigeo?.departamento).subscribe(
        response =>  this.provincias= response
      );

    this.ubigeoService.listaDistritos(this.proveedor.ubigeo?.departamento, this.proveedor.ubigeo?.provincia).subscribe(
      response =>  this.distritos= response
    );

}


actualiza(){

  this.submitted = true;

  //finaliza el método si hay un error
  if (this.formsActualiza.invalid){
    return;
  }

  this.proveedorService.actualizaProveedor(this.proveedor).subscribe(
        (x) => {
          this.submitted = false;
          alert(x.mensaje);
          this.proveedorService.consultaProveedor(this.filtro==""?"todos":this.filtro).subscribe(
                  (x) => this.proveedores = x
          );
        } 
  );

  //limpiar los combobox
  this.distritos = [];
  this.provincias = [];

  //limpiar los componentes del formulario a través de los ngModel

  this.proveedor = { 
    idProveedor:0,
    razonsocial:"",
    ruc:"",
    direccion: "",
    telefono: "",
    celular: "",
    contacto: "",
    estado:1,
    ubigeo:{
      idUbigeo: -1,
      departamento:"-1",
      provincia:"-1",
      distrito:"-1",
  }
}
}
limpiar(){
  this.proveedor = { 
    idProveedor:0,
    razonsocial:"",
    ruc:"",
    direccion: "",
    telefono: "",
    celular: "",
    contacto: "",
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