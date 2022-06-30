import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/models/cliente.model';
import { DatosPedido } from 'src/app/models/datos-pedido';
import { Detalle } from 'src/app/models/detalle';
import { DetallePedido } from 'src/app/models/detalle-pedido';
import { Producto } from 'src/app/models/producto.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transaccion-pedido',
  templateUrl: './transaccion-pedido.component.html',
  styleUrls: ['./transaccion-pedido.component.css']
})
export class TransaccionPedidoComponent implements OnInit {

  //para llenar el combo
  cliente: Cliente[] = [];
  productos: Producto[] = [];
  detallePedidoT : DetallePedido[] = [];

  cantidad2 : number = 0;
  totalPagar : number = 0.0;
  submitted = false;

  detaT :DetallePedido ={
    idProducto : 0,
    cantidad : 0,
    precio : 0.0
  }

  datosPedido: DatosPedido ={
    lugarEntrega: "",
    cliente : {
      idCliente: -1
    }
  }

  detallePedido: Detalle[] = [];
  detalle: Detalle ={
    idProducto : 0,
    descProducto: "",
    cantidad : 0,
    precio : 0.0,
    importe : 0.0
  }

  constructor(private clienteService:ClienteService, private productoService: ProductoService, private pedidoService: PedidoService) { 
    this.clienteService.listaCliente().subscribe(
      (c) => this.cliente = c
    );

    this.productoService.listaProductoPedido().subscribe(
      (a) => this.productos = a
    )
  }

  forms = new FormGroup({
    validaFecha: new FormControl('',[Validators.required]),
    validaLugar: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ.? 0-9-]+$')]),
    validaCliente: new FormControl('', [Validators.min(1)]),
  });


  ngOnInit(): void {
  }

  ejecutarTransaccion(){

    this.submitted = true;

    //valida el formulario
    if(this.forms.invalid){
      return; //si el formulario es invalido no ejecuta lo que sigue
    }else if(this.detallePedido.length ==  0){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El pedido esta vacio',
      })
      return;
    }

    this.detallePedido.forEach(element => {
      this.detaT.idProducto = element.idProducto;
      this.detaT.cantidad = element.cantidad;
      this.detaT.precio = element.precio;
      this.detallePedidoT.push(this.detaT);
      this.detaT ={
        idProducto : 0,
        cantidad : 0,
        precio : 0.0
      };
    });

    this.datosPedido.listaProductos = this.detallePedidoT;

    this.pedidoService.registraPedido(this.datosPedido).subscribe(
      (x) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: x.mensaje,
          showConfirmButton: true
        });
        this.submitted =  false;
        this.cantidad2 = 0;
        this.totalPagar = 0.0;
        this.detaT ={
          idProducto : 0,
          cantidad : 0,
          precio : 0.0
        };
        this.detallePedidoT = [];
        this.datosPedido ={
          lugarEntrega: "",
          cliente : {
            idCliente: -1
          }
        }
        this.detallePedido = [];
        this.detalle ={
          idProducto : 0,
          descProducto: "",
          cantidad : 0,
          precio : 0.0,
          importe : 0.0
        }
      }
    );

  }


  eliminarItem(aux2 : Detalle){
    let index = -1;
    this.detallePedido.forEach(element => {
      if(element.idProducto == aux2.idProducto){
        index = this.detallePedido.indexOf(element)
        this.totalPagar = this.totalPagar - element.importe!;
      }
    });

    if(index != -1){
      this.detallePedido.splice(index,1);
      Swal.fire({
        position: 'top-end',
        icon: 'info',
        title: 'El producto fue eliminado de la lista',
        showConfirmButton: false,
        timer: 2000
      })
    }
  }



  agregar(aux:Producto){

    Swal.fire({
      title: 'Ingrese una cantidad',
      input: 'number',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      showLoaderOnConfirm: true,
      preConfirm: (can) => {
        this.cantidad2 = can;
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        if(this.cantidad2 > 0 ){
          this.detalle.idProducto = aux.idProducto;
          this.detalle.descProducto = aux.nombre;
          this.detalle.cantidad = this.cantidad2;
          this.detalle.precio = aux.precio;
         
          let index = -1;
          this.detallePedido.forEach(element => {
            if(element.idProducto == this.detalle.idProducto){
              this.detalle.cantidad = parseInt(element.cantidad!.toString()) + parseInt(this.detalle.cantidad!.toString());
              this.totalPagar = this.totalPagar - element.importe!;
              index = this.detallePedido.indexOf(element)
            }
          });
          this.detalle.importe = aux.precio! * this.detalle.cantidad;
          this.totalPagar += this.detalle.importe;
          this.detallePedido.push(this.detalle);

          if(index != -1){
            this.detallePedido.splice(index,1);
          }

          this.detalle ={
            idProducto : 0,
            descProducto: "",
            cantidad : 0,
            precio : 0.0,
            importe : 0.0
          }
          this.cantidad2 = 0;

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Agregado a la lista',
            showConfirmButton: false,
            timer: 1500
          })
        }else{
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Cantidad incorrecta',
            showConfirmButton: false,
            timer: 3000
          })
        }
      }
    })

  }

}
