import { Component, HostListener, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { ListaUnidades } from 'src/app/core/models/ListaUnidades';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  public unidadesGPS: ListaUnidades[] = [];
  mapaGPS: any;

  unidad: string;
  medico: string;
  paramedico: string;
  piloto: string;
  lat: number;
  lon: number;
  ultimoEnvio: string;
  atencion: string;
  icon: string;

  latitud = -12.110631;
  longitud = -77.021427;
  zoom=13;

  dataArray = {
    "totalItems": 2,
    "items": [
      {
        "id": 1,
        "name": "foo"
  
      },
      {
        "id": 2,
        "name": "bar"
      },
      ]
  }

  dataArray1 = {
    "totalItems": 2,
    "items": [
      {
        "id": 100,
        "name": "foo"
  
      },
      {
        "id": 200,
        "name": "bar"
      },
      ]
  }
            
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  constructor(db: AngularFireDatabase) {
    this.itemsRef = db.list('SuizaAlertaApp/gpsUbicacion');  

    this.itemsRef.snapshotChanges()
      .subscribe(async actions => {
        this.unidadesGPS = [];
        
        
         actions.forEach(action => {

          this.unidad = action.payload.val()['UME']
          this.medico = action.payload.val()['Medico']
          this.paramedico = action.payload.val()['Paramedico']
          this.piloto = action.payload.val()['Piloto']
          this.lat = action.payload.val()['lat']
          this.lon = action.payload.val()['lon']
          this.ultimoEnvio = action.payload.val()['ultimoEnvioGPS']
          this.atencion = action.payload.val()['Atencion']
          this.icon = '../assets/icon/' + action.payload.val()['icon'] + ".png"

          const data = new ListaUnidades(this.unidad,this.medico,this.paramedico,this.piloto,this.lat,this.lon, this.ultimoEnvio,this.atencion,this.icon);
          this.unidadesGPS.push(data)
        });

        this.updateMapa(this.unidadesGPS);

      });
  }

  ngOnInit(): void {
    this.dataArray = this.dataArray1;
    console.log(this.dataArray);
    
  }

  updateMapa(valor){
    this.mapaGPS = valor;
  }


}
