import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';
import { AppSettings } from '../app.settings';
import { Marca } from '../models/marca.model';

const baseUrlUtil = "http://localhost:8090/url/producto";



//const baseUrlProducto = "http://localhost:8090/url/producto";
const baseUrlProducto = AppSettings.API_ENDPOINT+ "/producto";


@Injectable({
  providedIn: 'root'
})

export class ProductoService {

  constructor(private http:HttpClient) { }

  insertaProducto(data:Producto): Observable<any>{

    return this.http.post(baseUrlUtil, data);
  }


  listaProducto(): Observable<Producto[]> {
    return this.http.get<Producto[]>(baseUrlProducto);
  }

  listarProducto(nombre:string, serie:string, idMarca:number, idPais:number,estado:number):Observable<any> {
    const params = new HttpParams().set("nombre", nombre).set("serie", serie).set("idPais", idPais).set("idMarca",idMarca).set("estado", estado);  
    return this.http.get<any>(baseUrlProducto + "/listaproductoporparmetros", {params});
 }

 listaProductoxnombre(filtro:string):Observable<Producto[]>{
  return this.http.get<Producto[]>(baseUrlProducto+"/listarproductopornombre/"+filtro);

 }
  
 actualizarProducto(obj:Producto):Observable<any>{
   return this.http.put(baseUrlProducto+"/actualizaProducto/",obj);
 }
 eliminarProducto(id:any): Observable<any>{
  return this.http.delete(baseUrlProducto+"/eliminarProducto/"+id);
}
  

}


