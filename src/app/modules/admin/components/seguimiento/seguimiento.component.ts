import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { ListaUnidades } from 'src/app/core/models/ListaUnidades';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent implements OnInit {

  public unidadesGPS: ListaUnidades[] = [];
  public nuevaLista = []
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

  selectedOptions = "TODOS";

            
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  
  constructor(db: AngularFireDatabase) {
    this.itemsRef = db.list('SuizaMoto/UbicacionUnidadesActual');  

    this.itemsRef.snapshotChanges()
    .subscribe(async actions => {
      this.unidadesGPS = [];
      this.nuevaLista = [];

      actions.forEach(action => {

        this.lat = action.payload.val()['latitud']
        this.lon = action.payload.val()['longitud']
        this.piloto = action.payload.val()['nombrePiloto']
        this.unidad = action.payload.val()['placa']
        this.ultimoEnvio = action.payload.val()['ultimoEnvioGPS']
        this.icon = '../assets/icon/moto.png'

        const data = new ListaUnidades(this.unidad,this.piloto,this.lat,this.lon, this.ultimoEnvio,this.icon);
        this.unidadesGPS.push(data)

      })
      
      this.nuevaLista = this.unidadesGPS
      this.updateMapa(this.nuevaLista);
    });
  }

  ngOnInit(): void {
  }

  onChange($event) {
  }

  updateMapa(valor){
    this.mapaGPS = valor;
  }

}
