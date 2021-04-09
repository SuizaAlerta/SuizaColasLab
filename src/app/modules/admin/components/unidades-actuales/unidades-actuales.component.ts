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
  
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;

  constructor(db: AngularFireDatabase) {
    this.itemsRef = db.list('SuizaAlertaApp/gpsUbicacion'); 
    this.itemsRef.snapshotChanges()
      .subscribe(async actions => {
        this.unidadesActuales = [];

        actions.forEach(action => {
          
          this.unidad = action.payload.val()['UME']
          this.medico = action.payload.val()['Medico']
          this.paramedico = action.payload.val()['Paramedico']
          this.piloto = action.payload.val()['Piloto']
          this.lat = action.payload.val()['lat']
          this.lon = action.payload.val()['lon']
          this.atencion = action.payload.val()['Atencion']
          this.icon = '../assets/icon/' + action.payload.val()['icon'] + ".png"

          const data = new ListaUnidades(this.unidad,this.medico,this.paramedico,this.piloto,this.lat,this.lon,this.atencion,this.icon);
          this.unidadesActuales.push(data)

        });        

        console.log(this.unidadesActuales);
        

      });
  }

  ngOnInit(): void {
  }

}