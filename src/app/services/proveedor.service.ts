import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proveedor } from '../models/proveedor.model';
import { AppSettings } from '../app.settings';

const baseUrlUtil = AppSettings.API_ENDPOINT+ '/util';
const baseUrlProveedor = AppSettings.API_ENDPOINT+ '/proveedor';


@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(private http: HttpClient) { }

  registrar(data:Proveedor): Observable<any>{
    return this.http.post(baseUrlProveedor, data);
  }

  listaProveedor(razonsocial:string, ruc:string, direccion:string, telefono:string, celular:string, contacto:string,
    idUbigeo:number, estado:number):Observable<any> {
    const params = new HttpParams().set("razonsocial", razonsocial).set("ruc", ruc).set("direccion",direccion)
    .set("telefono",telefono).set("celular",celular).set("contacto",contacto)
    .set("idUbigeo", idUbigeo).set("estado", estado);  
    return this.http.get<any>(baseUrlProveedor + "/listaProveedorConParametros", {params});
 }
  consultaProveedor(filtro : string): Observable<Proveedor[]>{
    return this.http.get<Proveedor[]>(baseUrlProveedor+"/listaProveedorPorRazonLike/" + filtro);
  }

  registraProveedor(aux :Proveedor): Observable<any>{
      return this.http.post<any>(baseUrlProveedor+"/registraProveedor", aux);
  }

  actualizaProveedor(aux :Proveedor): Observable<any>{
      return this.http.put<any>(baseUrlProveedor+"/actualizaProveedor", aux);
  }
}
