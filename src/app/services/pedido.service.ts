import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { DatosPedido } from '../models/datos-pedido';


const baseUrlUtil = AppSettings.API_ENDPOINT+ '/util';
const baseUrlPedido = AppSettings.API_ENDPOINT+ '/pedido';


@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private http:HttpClient) { }

  registraPedido(data:DatosPedido): Observable<any>{
    return this.http.post(baseUrlPedido+"/guardar", data);
  }

}
