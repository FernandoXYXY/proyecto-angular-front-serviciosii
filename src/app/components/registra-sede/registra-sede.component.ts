import { Component, OnInit } from '@angular/core';
import { Pais } from 'src/app/models/pais.model';
import { Sede } from 'src/app/models/sede.model';
import { PaisService } from 'src/app/services/pais.service';
import { SedeService } from 'src/app/services/sede.service';

@Component({
  selector: 'app-registra-sede',
  templateUrl: './registra-sede.component.html',
  styleUrls: ['./registra-sede.component.css']
})
export class RegistraSedeComponent implements OnInit {
  // variables globales
  Paises: Pais[] = [];
  sede: Sede = {
    pais: {
      idPais: -1
    }
    
  };

  
  mensaje:string ="";

  constructor(private PaisService: PaisService,
              private sedeService: SedeService) { 
    this.PaisService.listaPais().subscribe(x => this.Paises = x);
  }
  insertaSede():void {
    this.sedeService.insertaSede(this.sede).subscribe(x => alert(x.mensaje))
  }
  ngOnInit(): void {
  }
 
}
