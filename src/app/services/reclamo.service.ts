import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reclamo } from '../models/reclamo.model';
import { AppSettings } from '../app.settings';

const baseUrlUtil = AppSettings.API_ENDPOINT+ '/util';
const baseUrlReclamo = AppSettings.API_ENDPOINT+ '/reclamo';


@Injectable({
  providedIn: 'root'
})
export class ReclamoService {

  constructor(private http:HttpClient) {   }

  insertaReclamo(data:Reclamo): Observable<any>{
    return this.http.post(baseUrlReclamo+"/registrar", data);
  }

  actualizarReclamo(data:Reclamo): Observable<any>{
    return this.http.put(baseUrlReclamo+"/actualizar",data);
  }

  elinarReclamo(id:any): Observable<any>{
    return this.http.delete(baseUrlReclamo+"/eliminar/"+id);
  }

  activarReclamo(data:Reclamo): Observable<any>{
    return this.http.put(baseUrlReclamo+"/activar",data);
  }

  consultaReclamo(estado:number, fechaCompra:string, idCliente:number, idTipo:number):Observable<any>{    
    const params = new HttpParams().set("estado", estado).set("fechaCompra", fechaCompra).set("idCliente", idCliente).set("idTipo", idTipo)
    return this.http.get<any>(baseUrlReclamo+"/listarReclamosPorParametros", {params});
  }


}
