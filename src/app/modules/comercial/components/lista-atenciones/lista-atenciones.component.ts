import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-lista-atenciones',
  templateUrl: './lista-atenciones.component.html',
  styleUrls: ['./lista-atenciones.component.css']
})
export class ListaAtencionesComponent implements OnInit {

  displayedColumns = ['fechaRegistro', 'numeroReferencia', 'nombreCompania', 'direccionRecojo', 'motorizado', 'placa', 'observacion', 'Observacion', 'formaPago', 'montoRecibido', 'tiempoLlegada', 'tiempoEspera', 'estado'];
  dataSource: MatTableDataSource<PuestoData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  listaAtenciones: any = [];
  tiempoLlegada: any;
  tiempoEspera: any;
  mydate: string;
  formularioInicial: FormGroup;
  
  constructor(private firestore: AngularFirestore, private _builder: FormBuilder,) {

    const today = new Date();
    this.mydate = formatDate(today, 'yyyy-MM-dd', 'en-US');

    this.formularioInicial = this._builder.group({
      DESDE: [this.mydate, Validators.required],
      HASTA: [this.mydate, Validators.required]
    });

  }

  ngOnInit(): void {
  }

  distancia(lat1, long1, lat2, long2) {
    
    const R = 6371e3; // metros
    const φ1 = lat1 * Math.PI/180; // φ, λ radianes
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (long2-long1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c; // metros

    return d/1000;

  }

  cargarAtenciones(values) {
    let start = new Date(values.DESDE);
    let end = new Date(values.HASTA);
    end.setDate(end.getDate()+1)

    this.firestore.collection('AtencionesCurso', ref => ref.where('timestamp','>',start).where('timestamp','<',end)).valueChanges().subscribe(val => {

      var atencionesFinalizadas = val.filter(data => {
        return data['estado'] == "Finalizado"
      })

      atencionesFinalizadas.forEach(dato => {
        if(dato['timestampFinRecorrido'] != "") {
          this.tiempoLlegada = (new Date(new Date(dato['timestampRegistroLlegada'].seconds*1000)).getTime() - new Date(new Date(dato['timestampInicioRecorrido'].seconds*1000)).getTime()) / (1000*60);
          this.tiempoEspera = (new Date(new Date(dato['timestampFinRecorrido'].seconds*1000)).getTime() - new Date(new Date(dato['timestampRegistroLlegada'].seconds*1000)).getTime()) / (1000*60);
          dato['tiempoLlegada'] = parseInt(this.tiempoLlegada);
          dato['tiempoEspera'] = parseInt(this.tiempoEspera);
        } 

        if(dato['latlongInicioRecorrido'] != undefined) {
          dato['distancia'] = this.distancia(dato['latlongInicioRecorrido'].split(',')[0],dato['latlongInicioRecorrido'].split(',')[1],dato['latlongFinRecorrido'].split(',')[0],dato['latlongFinRecorrido'].split(',')[1])
        }

      })
      
      this.listaAtenciones = atencionesFinalizadas;   

      this.dataSource = new MatTableDataSource(this.listaAtenciones);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
      
    })
    
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}

export interface PuestoData {
  fechaRegistro: string;
  numeroReferencia: string;
  nombreCompania: string;
  direccionRecojo: string;
  motorizado: string;
  placa: string;
  observacion: string;
  Observacion: string;
  formaPago: string;
  montoRecibido: string;
  tiempoLlegada: string;
  tiempoEspera: string;
  estado: string;
}