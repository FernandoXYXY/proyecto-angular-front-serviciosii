import { Component, OnInit } from '@angular/core';
import { Pais } from 'src/app/models/pais.model';
import { Sede } from 'src/app/models/sede.model';
import { PaisService } from 'src/app/services/pais.service';
import { SedeService } from 'src/app/services/sede.service';

@Component({
  selector: 'app-consulta-sede',
  templateUrl: './consulta-sede.component.html',
  styleUrls: ['./consulta-sede.component.css']
})
export class ConsultaSedeComponent implements OnInit {
  Paises: Pais[] = [];
  Sede: Sede[] = [];
  nombre: string = "";
  codPostal: string = "";
  estado: number = 1;
  idSede: string = "";
  sEstado: boolean = false;
  selPais: number = -1;


  
 

  constructor(private PaisService: PaisService,
              private sedeService: SedeService) { 
  this.PaisService.listaPais().subscribe(x => this.Paises = x);      
  
  
  
}

  ngOnInit(): void {
  }

  listaSedeNEP(){
    if(this.sEstado == false){
      this.estado = 0;
    }else{
      this.estado = 1;
    }
    
    if(!(this.idSede).toString().trim().match(/^-?\d*$/)){
       
      return alert("Escriba correctamente el Id de la sede")
    }
    if(!this.codPostal.trim().match(/^\d*$/)){
      this.codPostal = ''
      return alert("Escriba correctamente el Codigo Postal")
    }
    if(!this.nombre.trim().match(/^[a-zA-Z ]*$/)){
      this.nombre = ''
      return alert("Escriba correctamente el nombre de la Sede")
    }
    this.sedeService.consultaSede(this.nombre, this.estado, this.selPais, this.codPostal, this.idSede == ""? -1: parseInt(this.idSede) ).subscribe(x => this.Sede = x.lista)
  }
  

}
