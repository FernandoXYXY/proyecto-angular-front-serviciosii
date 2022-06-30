import { Cliente } from "./cliente.model";
import { DetallePedido } from "./detalle-pedido";


export class DatosPedido {
    fechaEntrega ?: Date; 
    lugarEntrega ?: string;
    cliente ?: Cliente;
    listaProductos ?: DetallePedido [];
}
