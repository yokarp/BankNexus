import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  url = 'https://mapitaetitc.herokuapp.com/v1/mapita';

  constructor(private http: HttpClient) {}

  getClients(): Observable<any>{
    return this.http.get(this.url);
  }

  putTranfer( id: string, value: number ): Observable<any>{
    return this.http.put(this.url, { _id: id , moneda: value });
  }


}
