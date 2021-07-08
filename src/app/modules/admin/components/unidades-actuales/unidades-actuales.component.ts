import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { ListaUnidades } from 'src/app/core/models/ListaUnidades';

@Component({
  selector: 'app-unidades-actuales',
  templateUrl: './unidades-actuales.component.html',
  styleUrls: ['./unidades-actuales.component.css']
})
export class UnidadesActualesComponent implements OnInit {

  public unidadesActuales: ListaUnidades[] = [];

  unidad: string;
  medico: string;
  paramedico: string;
  piloto: string;
  lat: number;
  lon: number;
  atencion: string;
  icon: string;
  ultimoEnvio: string;
  
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;

  constructor(db: AngularFireDatabase) {
    this.itemsRef = db.list('SuizaMoto/UbicacionUnidades'); 
    this.itemsRef.snapshotChanges()
      .subscribe(async actions => {
        this.unidadesActuales = [];

        actions.forEach(action => {
          
        this.lat = action.payload.val()['latitud']
        this.lon = action.payload.val()['longitud']
        this.piloto = action.payload.val()['nombrePiloto']
        this.unidad = action.payload.val()['placa']
        this.ultimoEnvio = action.payload.val()['ultimoEnvioGPS']
        this.icon = '../assets/icon/moto.png'

          
        const data = new ListaUnidades(this.unidad,this.piloto,this.lat,this.lon, this.ultimoEnvio,this.icon);
        this.unidadesActuales.push(data)
          

          
          

          /* const data = new ListaUnidades(this.unidad,this.medico,this.paramedico,this.piloto,this.lat,this.lon, this.ultimoEnvio,this.atencion,this.icon);
          this.unidadesActuales.push(data) */

        });                

      });
  }

  ngOnInit(): void {
  }
  

}
