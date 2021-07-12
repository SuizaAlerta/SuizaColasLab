import { Component, HostListener, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { ListaUnidades } from 'src/app/core/models/ListaUnidades';
import { UnidadesActualesComponent } from '../unidades-actuales/unidades-actuales.component';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

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
    this.itemsRef = db.list('SuizaMoto/UbicacionUnidades');  

    this.itemsRef.snapshotChanges()
    .subscribe(async actions => {
      this.unidadesGPS = [];
      this.nuevaLista = [];

      actions.forEach(action => {
        console.log(action.payload.val());

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
      
      /* actions.forEach(action => {

        this.unidad = action.payload.val()['UME']
        this.medico = action.payload.val()['Medico']
        this.paramedico = action.payload.val()['Paramedico']
        this.piloto = action.payload.val()['Piloto']
        this.lat = action.payload.val()['latitud']
        this.lon = action.payload.val()['longitud']
        this.ultimoEnvio = action.payload.val()['ultimoEnvioGPS']
        this.atencion = action.payload.val()['Atencion']
        

        if(this.unidad == "UME36" || this.unidad == "UME37" || this.unidad == "UME38"){
          this.icon = '../assets/icon/linea2.png'
        } else if(this.unidad[0] == 'C' || this.unidad[0] == 'A') {
            this.icon = '../assets/icon/A' + action.payload.val()['icon'] + ".png"
        } else {
            this.icon = '../assets/icon/' + action.payload.val()['icon'] + ".png"
        }


        const data = new ListaUnidades(this.unidad,this.medico,this.paramedico,this.piloto,this.lat,this.lon, this.ultimoEnvio,this.atencion,this.icon);
        this.unidadesGPS.push(data)
      });


      if(this.selectedOptions == "UME"){
        
        this.unidadesGPS.forEach(val => {
          if(val['unidad'][0] == "U") {
            this.nuevaLista.push(val)
          } 
        })
      } else if(this.selectedOptions == "CONSULTAS Y APOYO"){
        this.unidadesGPS.forEach(val => {
          if(val['unidad'][0] == "A" || val['unidad'][0] == "C") {
            this.nuevaLista.push(val)
          } 
        })
      } else {
        this.nuevaLista = this.unidadesGPS
      } */

      this.updateMapa(this.nuevaLista);

      console.log(this.updateMapa);
      

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
