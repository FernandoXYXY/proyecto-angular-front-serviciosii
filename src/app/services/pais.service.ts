import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pais } from '../models/pais.model';
import { AppSettings } from '../app.settings';

const baseUrlUtil = "http://localhost:8090/url/util/listaPais";

@Injectable({
  providedIn: 'root'
})
export class PaisService {
 
  constructor(private http : HttpClient) { }


  listaPais():Observable<Pais[]>{
    return this.http.get<Pais[]>(baseUrlUtil);
  }
}

