import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Marca } from '../models/marca.model';



const baseUrlUtil = AppSettings.API_ENDPOINT+ '/util';

const baseUrlMarca = AppSettings.API_ENDPOINT+ "/marca";


@Injectable({
  providedIn: 'root'
})
export class MarcaService {
 

  constructor(private http: HttpClient) {  }

  insertaMarca(data:Marca): Observable<any>{
    return this.http.post(baseUrlMarca, data);
  }

  listaMarca(): Observable<Marca[]> {
    return this.http.get<Marca[]>(baseUrlMarca);
  }

  listarMarca(nombre:string, descripcion:string, certificado:string, idPais:number, estado:number):Observable<any> {
    const params = new HttpParams().set("nombre", nombre).set("descripcion", descripcion).set("certificado",certificado)
    .set("idPais", idPais).set("estado", estado);  
    return this.http.get<any>(baseUrlMarca + "/listaMarcaConParametros", {params});
 }

 listaMarcaxnombre(filtro:string):Observable<Marca[]>{
  return this.http.get<Marca[]>(baseUrlMarca+"/listaMarcaPorNombreLike/"+filtro);

 }

 registraMarca(aux:Marca):Observable<any>{
  return this.http.post<any>(baseUrlMarca+"/registraMarca", aux);
 }

  
 actualizarMarca(aux:Marca):Observable<any>{
  return this.http.put<any>(baseUrlMarca+"/actualizaMarca", aux);
 }

// eliminarMarca(data:Marca): Observable<any>{
 // return this.http.delete(baseUrlMarca+"/eliminarMarca/"+data.idMarca);
//}

eliminarMarca(id: any): Observable<any>{
  return this.http.delete(baseUrlMarca + "/eliminaMarca/" + id);
}

  

}