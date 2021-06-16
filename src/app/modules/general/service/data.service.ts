import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const BASE_API_URL = 'http://119.8.152.20/ws_suizaalertaapppreprod/';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public http: HttpClient){}

    sendSms(sms){
        return this.http.post(BASE_API_URL+'/api/medicamento/app_listarkardex?idunidadmedica=CONS%2016', JSON.stringify(sms), httpOptions);
    }
}
