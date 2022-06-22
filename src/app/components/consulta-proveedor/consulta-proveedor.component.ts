import { Component, OnInit } from '@angular/core';
import { Proveedor } from 'src/app/models/proveedor.model';
import { Ubigeo } from 'src/app/models/ubigeo.model';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { UbigeoService } from 'src/app/services/ubigeo.service';

@Component({
  selector: 'app-consulta-proveedor',
  templateUrl: './consulta-proveedor.component.html',
  styleUrls: ['./consulta-proveedor.component.css']
})
export class ConsultaProveedorComponent implements OnInit {

  //Ng model
    razonsocial: string="";
    ruc: string="";
    direccion: string="";
    telefono: string="";
    celular: string="";
    contacto: string="";

  selDepartamento:string = "-1"; 
  selProvincia:string = "-1"; 
  selDistrito:number = -1;
  estado:boolean = true;
  
  //Ubigeo
  departamentos: string[]  = [];
  provincias: string[]  = [];
  distritos: Ubigeo[]  = [];

  //Grila
  proveedores: Proveedor[] = [];

  constructor(private ubigeoService: UbigeoService, private proveedorService:ProveedorService) { 

    ubigeoService.listarDepartamento().subscribe(
        (x) => this.departamentos = x
    );

  }

  consultaProveedor(){
    this.proveedorService.listaProveedor(this.razonsocial, this.ruc, this.direccion, this.telefono, this.celular, this.contacto,
      this.selDistrito, this.estado?1:2).subscribe(
          (x) => {
              this.proveedores = x.lista;
              alert(x.mensaje);
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
