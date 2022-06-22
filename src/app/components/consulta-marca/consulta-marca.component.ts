import { Component, OnInit } from '@angular/core';
import { Marca } from 'src/app/models/marca.model';
import { Pais } from 'src/app/models/pais.model';
import { MarcaService } from 'src/app/services/marca.service';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-consulta-marca',
  templateUrl: './consulta-marca.component.html',
  styleUrls: ['./consulta-marca.component.css']
})
export class ConsultaMarcaComponent implements OnInit {
 
nombre: string = "";
descripcion: string="";
certificado: string="";
selPais:number = -1;
estado:boolean = true;


Paises: Pais[] = [];
Marca: Marca[] = [];



 
  constructor(private PaisService: PaisService,
    private marcaService: MarcaService) { 
this.PaisService.listaPais().subscribe(x => this.Paises = x);      



}



  ngOnInit(): void {
  }

 

consultaMarca(){
  this.marcaService.listarMarca(this.nombre, this.descripcion, this.certificado, this.selPais, this.estado?1:2).subscribe(
        (x) => {
            this.Marca = x.lista;
            
        }
  );
}



}