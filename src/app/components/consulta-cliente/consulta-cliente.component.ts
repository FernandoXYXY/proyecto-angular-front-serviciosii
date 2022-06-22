import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { Ubigeo } from 'src/app/models/ubigeo.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { UbigeoService } from 'src/app/services/ubigeo.service';

@Component({
  selector: 'app-consulta-cliente',
  templateUrl: './consulta-cliente.component.html',
  styleUrls: ['./consulta-cliente.component.css']
})
export class ConsultaClienteComponent implements OnInit {

  //Ng model
  nombres: string="";
  apellidos: string="";
  dni: string="";
  correo: string="";
  direccion: string="";

  selDepartamento:string = "-1"; 
  selProvincia:string = "-1"; 
  selDistrito:number = -1;
  estado:boolean = true;

//Ubigeo
departamentos: string[]  = [];
provincias: string[]  = [];
distritos: Ubigeo[]  = [];

//Grila
clientes: Cliente[] = [];

constructor(private ubigeoService: UbigeoService, private clienteService:ClienteService) { 

  ubigeoService.listarDepartamento().subscribe(
      (x) => this.departamentos = x
  );

}

consultaCliente(){
  this.clienteService.listarCliente(this.nombres, this.apellidos, this.dni, this.correo, this.direccion,
    this.selDistrito, this.estado?1:2).subscribe(
        (x) => {
            this.clientes = x.lista;
        }
  );
}

cargaProvincia(){
      this.ubigeoService.listaProvincias(this.selDepartamento).subscribe(
              (x)  => this.provincias = x      
      );
      this.selProvincia = "-1";
      this.distritos = [];
      this.selDistrito = -1;
}
cargaDistrito(){
      this.ubigeoService.listaDistritos(this.selDepartamento, this.selProvincia).subscribe(
              (x)  => this.distritos = x      
      );
      this.selDistrito = -1;
}


ngOnInit(): void {}

}
