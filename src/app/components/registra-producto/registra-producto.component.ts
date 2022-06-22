import { Component, OnInit } from '@angular/core';
import { Marca } from 'src/app/models/marca.model';
import { Pais } from 'src/app/models/pais.model';
import { Producto } from 'src/app/models/producto.model';
import { MarcaService } from 'src/app/services/marca.service';
import { PaisService } from 'src/app/services/pais.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-registra-producto',
  templateUrl: './registra-producto.component.html',
  styleUrls: ['./registra-producto.component.css']
})
export class RegistraProductoComponent implements OnInit {

  pais : Pais[]=[];
  marca : Marca[]=[];

  producto : Producto={
      pais:{
        idPais:-1
      },

      marca:{
        idMarca: -1
      }

  }

  constructor( private paisService: PaisService, private marcaSevice: MarcaService, private productoService: ProductoService) { 
    this.paisService.listaPais().subscribe(
      (x) => this.pais = x

        );

       this.marcaSevice.listaMarca().subscribe(
         (y) => this.marca = y
    
           );

   }

   
   insertado(){
      this.productoService.insertaProducto(this.producto).subscribe(

        Response => {
              alert(Response.mensaje);
        },

        error =>{
          alert(error.mensaje);

        }
        
      )

   }


  

  ngOnInit(): void {
  }

  
}
