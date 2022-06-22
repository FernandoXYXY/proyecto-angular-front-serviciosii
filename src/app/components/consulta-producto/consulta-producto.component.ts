import { Component, OnInit } from '@angular/core';
import { Marca } from 'src/app/models/marca.model';
import { Pais } from 'src/app/models/pais.model';
import { Producto } from 'src/app/models/producto.model';
import { MarcaService } from 'src/app/services/marca.service';
import { PaisService } from 'src/app/services/pais.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-consulta-producto',
  templateUrl: './consulta-producto.component.html',
  styleUrls: ['./consulta-producto.component.css']
})
export class ConsultaProductoComponent implements OnInit {

  nombre: string = "";
  serie : string = "";
  estado: boolean=true;
  idMarca: number=-1;
  idPais:number = -1;

  Paises: Pais[] = [];
  Marca: Marca[] = [];
  Producto: Producto[] = [];

  constructor(private PaisService: PaisService,private marcaService: MarcaService,
    private productoservice: ProductoService) { 
  this.PaisService.listaPais().subscribe(x => this.Paises = x);
  this.marcaService.listaMarca().subscribe(x => this.Marca = x);
    }  

 
  consultaProducto(){
    this.productoservice.listarProducto(this.nombre, this.serie, this.idMarca, this.idPais, this.estado?1:0).subscribe(
      (x) => {
          this.Producto = x.lista;
          
      }
);
}

ngOnInit(): void {
}


}
