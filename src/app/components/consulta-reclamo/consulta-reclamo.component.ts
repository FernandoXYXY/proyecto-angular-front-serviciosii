import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { Reclamo } from 'src/app/models/reclamo.model';
import { TipoReclamo } from 'src/app/models/tipo-reclamo.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { ReclamoService } from 'src/app/services/reclamo.service';
import { TipoReclamoService } from 'src/app/services/tipo-reclamo.service';

@Component({
  selector: 'app-consulta-reclamo',
  templateUrl: './consulta-reclamo.component.html',
  styleUrls: ['./consulta-reclamo.component.css']
})
export class ConsultaReclamoComponent implements OnInit {


  tipoReclamo: TipoReclamo[] = [];
  cliente: Cliente[] = [];

  fecha:string ="";
  idCliente:number=-1;
  idTipo:number=-1;
  estado:boolean=true;
  estado2:number=1;
  reclamos:Reclamo[] = [];


  constructor(private tipoReclamoService:TipoReclamoService, private clienteService:ClienteService, private reclamoService:ReclamoService) { 
    this.tipoReclamoService.listaTipoReclamo().subscribe(
      (x) => this.tipoReclamo = x
    );

    this.clienteService.listaCliente().subscribe(
      (c) => this.cliente = c
    );
  }

  consultaReclamo(){
    if(this.estado == true){
      this.estado2 = 1;
    }else{
      this.estado2 = 0;
    }



    this.reclamoService.consultaReclamo(this.estado2, this.fecha, this.idCliente, this.idTipo).subscribe(
      (x) => {
        this.reclamos = x.lista;
        alert(x.mensaje);
      }
    );
  }


  ngOnInit(): void {
  }

}
