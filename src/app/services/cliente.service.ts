import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Cliente } from '../models/cliente.model';

const baseUrlUtil = AppSettings.API_ENDPOINT+ '/util';
const baseUrlCliente = AppSettings.API_ENDPOINT+ '/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  
  constructor(private http:HttpClient) { }

 listaCliente():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(baseUrlUtil+"/listaCliente");
  }
  /*
  registraCliente(data:Cliente): Observable<any>{
    return this.http.post(baseUrlCliente, data);
  } */

  listarCliente(nombres:string, apellidos:string, dni:string, correo:string, direccion:string,
    idUbigeo:number, estado:number):Observable<any> {
    const params = new HttpParams().set("nombres", nombres).set("apellidos", apellidos).set("dni",dni)
    .set("correo",correo).set("direccion",direccion)
    .set("idUbigeo", idUbigeo).set("estado", estado);  
    return this.http.get<any>(baseUrlCliente + "/listaClienteConParametros", {params});
 }

 /*crud*/
 listacrudCliente(filtro:string):Observable<Cliente[]> {
  return this.http.get<Cliente[]>(baseUrlCliente + "/listaClientePorNombre/"+ filtro);
}  

registraCliente(obj: Cliente): Observable<any>{
  return this.http.post(baseUrlCliente+ "/registraCliente", obj);
}

actualizaCliente(obj: Cliente): Observable<any>{
return this.http.put(baseUrlCliente + "/actualizaCliente", obj);
}

eliminaCliente(id: any): Observable<any>{
return this.http.delete(baseUrlCliente + "/eliminaCliente/" + id);
} 
  

  
}
