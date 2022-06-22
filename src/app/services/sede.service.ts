import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sede } from '../models/sede.model';
import { AppSettings } from '../app.settings';

const baseUrlUtil = AppSettings.API_ENDPOINT+ '/util';
const baseUrlSede = AppSettings.API_ENDPOINT+ '/sede';
const baseUrlRegistraSede = 'http://localhost:8090/url/sede/RegistraSede';


@Injectable({
  providedIn: 'root'
})
export class SedeService {

  constructor(private http:HttpClient) { }
  
  insertaSede(data:Sede):Observable<any>{
    return this.http.post(baseUrlRegistraSede, data)
  }
 
  consultaSede(nombre:string, estado:number, selPais:number, codPostal:string, idSede: number ): Observable<any> {

    const params = new HttpParams()
      .set("nombre", nombre)
      .set("estado", estado)
      .set("pais", selPais)
      .set("codPostal", codPostal)
      .set("idSede", idSede)
    
    return this.http.get(baseUrlSede + "/listaSedeNEP", {params});

  }

  /**
   * CRUD
   */

  listaSedeCrud(nombre:string):Observable<Sede[]> {
    return this.http.get<Sede[]>(baseUrlSede + "/listarSedePorNombre/"+ nombre);
  }

  registraSede(obj: Sede): Observable<any>{
    return this.http.post(baseUrlSede+ "/registraSede", obj);
  }
  actualizaSede(obj: Sede): Observable<any>{
    return this.http.put(baseUrlSede + "/actualizaSede", obj);
  }
  eliminaSede(id: any): Observable<any>{
    return this.http.delete(baseUrlSede + "/eliminarSede/" + id);
  }

}
