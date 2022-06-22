import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Marca } from 'src/app/models/marca.model';
import { Pais } from 'src/app/models/pais.model';
import { Producto } from 'src/app/models/producto.model';
import { MarcaService } from 'src/app/services/marca.service';
import { PaisService } from 'src/app/services/pais.service';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crud-producto',
  templateUrl: './crud-producto.component.html',
  styleUrls: ['./crud-producto.component.css']
})
export class CrudProductoComponent implements OnInit {

  formsActualiza = new FormGroup({
    validaFecha2: new FormControl('',[Validators.required]),
    validaNombre2: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ.? 0-9-]+$')]),
    validaSerie2: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ.? 0-9-]+$')]),
    validaDurabilidad2: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ.? 0-9-]+$')]),
    validaPrecio2: new FormControl('', [Validators.required,Validators.pattern('^(([0-9]+)|([0-9]+\.([0-9]{1,2})))$')]),
    validaStock2: new FormControl('', [Validators.required,Validators.pattern('^([0-9]{1,5})$')]),
    validaMarca2: new FormControl('', [Validators.min(1)]),
    validaPais2: new FormControl('', [Validators.min(1)]),
  });

  forms = new FormGroup({
    validaFecha: new FormControl('',[Validators.required]),
    validaNombre: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ.? 0-9-]+$')]),
    validaSerie: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ.? 0-9-]+$')]),
    validaDurabilidad: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ.? 0-9-]+$')]),
    validaPrecio: new FormControl('', [Validators.required,Validators.pattern('^(([0-9]+)|([0-9]+\.([0-9]{1,2})))$')]),
    validaStock: new FormControl('', [Validators.required,Validators.pattern('^([0-9]{1,5})$')]),
    validaMarca: new FormControl('', [Validators.min(1)]),
    validaPais: new FormControl('', [Validators.min(1)]),
  });


  

  //para la validacion
  submitted = false;

  productos :Producto[]=[];
  pais : Pais[]=[];
  marca : Marca[]=[];
  filtro : string="";

  producto : Producto={
    
      idProducto: 0,
      nombre: "",
      serie: "",
      durabilidad: "",
      

    
      estado: 1,
      marca: {
        idMarca: -1,

        pais: {
          idPais: -1,
          
        }
      },
      pais: {
        "idPais": -1,
      
    }

  }

   
      nombre:string= "";
      serie:string= "";
      estado:number =1;
      marca1:number=-1;
      pais1:number=  -1;
      
    






  constructor( private paisService: PaisService, private marcaSevice: MarcaService, private productoService: ProductoService) { 
    this.paisService.listaPais().subscribe(
      (x) => this.pais = x

        );

       this.marcaSevice.listaMarca().subscribe(
         (y) => this.marca = y
    
           );

   }

   
   insertado(){

    //para la validacion
      this.submitted = true;
    
      if(this.forms.invalid){
        return; //si el formulario es invalido no ejecuta lo que sigue
      }

      this.productoService.insertaProducto(this.producto).subscribe(

        (x) => {
          document.getElementById("btn_reg_cerrar")?.click();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: x.mensaje,
            showConfirmButton: true
          })
          this.productoService.listaProductoxnombre(this.filtro==""?"todos":this.filtro).subscribe(
            (y) => this.productos =y
          );
  
          this.submitted = false;
        }
        
      );

      this.limpiar();
        
      

   }

   buscar(aux: Producto){
    this.producto  = aux;
 }
 


   consulta(){
    this.productoService.listaProductoxnombre(this.filtro==""?"todos":this.filtro).subscribe(
          (y) => this.productos = y
    );
}

  ngOnInit(): void {
  }


  actualizar(){ 
      //para la validacion
      this.submitted = true;
    
      if(this.formsActualiza.invalid){
        return; //si el formulario es invalido no ejecuta lo que sigue
      }

      this.productoService.actualizarProducto(this.producto).subscribe(

        (x) => {
          document.getElementById("btn_reg_cerrar2")?.click();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: x.mensaje,
            showConfirmButton: true
          })
          this.productoService.listaProductoxnombre(this.filtro==""?"todos":this.filtro).subscribe(
            (y) => this.productos =y
          );
  
          this.submitted = false;
        }
        
      );

      this.limpiar();
    
 }


  eliminar(aux: Producto){
    Swal.fire({
      title: '¿Estas seguro de eliminar?',
      text: "Este cambio no podra revertirse",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, eliminar!'
      }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.eliminarProducto(aux.idProducto).subscribe(x => {
          Swal.fire('mensaje', x.mensaje, 'success');
          this.productoService.listaProductoxnombre(this.filtro==""?"todos":this.filtro).subscribe(
            (y) => this.productos =y
          );

        });
      }
    })

   }


   limpiar(){
    {
      this.producto={
      idProducto: 0,
      nombre: "",
      serie: "",
      durabilidad: "",
      fechaVigencia: new Date(),
      precio: 0,
      stock: 0,
      estado: 1,
      marca: {
        idMarca: 0,

        pais: {
          idPais: -1,
          
        }
      },
      pais: {
        idPais: -1,
        
      },
      
    }

   }
  }

}


