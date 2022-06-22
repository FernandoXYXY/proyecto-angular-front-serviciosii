import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { Ubigeo } from 'src/app/models/ubigeo.model';
import { UbigeoService } from 'src/app/services/ubigeo.service';
import { ClienteService } from 'src/app/services/cliente.service';
@Component({
  selector: 'app-registra-cliente',
  templateUrl: './registra-cliente.component.html',
  styleUrls: ['./registra-cliente.component.css']
})
export class RegistraClienteComponent implements OnInit {

  departamentos:string[]=[];
  provincias:string[]=[];
  distritos:Ubigeo[]=[];
  
  //Variables seleccionadas
  cliente: Cliente={
      ubigeo:{
        idUbigeo:-1,
        departamento:"-1",
        provincia:"-1",
        distrito:"",

      }

  }
  constructor(private ubigeoService:UbigeoService, private clienteService:ClienteService) { 

          this.ubigeoService.listarDepartamento().subscribe(
              (x) => this.departamentos = x
          );
  }
  registrarCliente(){
    this.clienteService.registraCliente(this.cliente).subscribe(
      response => {
        alert(response.mensaje);
      },
      error =>{
        alert(error);
      }
      
    )
  }

  cargaProvincia(){
    console.log("listaProvincia>>> " + this.cliente.ubigeo?.departamento);
    this.ubigeoService.listaProvincias(this.cliente.ubigeo?.departamento).subscribe(
      (x) => this.provincias = x
  );
  }
  cargaDistrito(){
    console.log("listaDistrito>>> " + this.cliente.ubigeo?.provincia);
    this.ubigeoService.listaDistritos(this.cliente.ubigeo?.departamento,this.cliente.ubigeo?.provincia).subscribe(
        (distritos) => this.distritos = distritos
    );
    }
  ngOnInit(): void {
  }

}
