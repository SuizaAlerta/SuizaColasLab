import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExcelService } from 'src/app/core/services/excel.service';

@Component({
  selector: 'app-registro-atenciones',
  templateUrl: './registro-atenciones.component.html',
  styleUrls: ['./registro-atenciones.component.css']
})
export class RegistroAtencionesComponent implements OnInit {

  listaAtenciones: any = [];
  tiempoatencion: any;
  mydate: string;
  formularioInicial: FormGroup;

  // headerInfo = ['latlongFinRecorrido','placa','timestamp','uid','direccion','estado','codUbicacion','fechaRegistro','dtInicioRecorrido','longitud','nombre','latitud','latlongInicioRecorrido','timestampInicioRecorrido','dtFinRecorrido','comentario','timestampFinRecorrido','tiempoTranscurrido','distancia','Observacion'];

  headerInfo = ['dtInicioRecorrido','codUbicacion','direccion','nombre','placa','distancia','tiempoTranscurrido','comentario','Observacion']
  constructor(private firestore: AngularFirestore, private _builder: FormBuilder, private excelExport: ExcelService) {

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
    
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI/180; // φ, λ in radians
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (long2-long1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c; // in metres

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
          this.tiempoatencion = (new Date(new Date(dato['timestampFinRecorrido'].seconds*1000)).getTime() - new Date(new Date(dato['timestampInicioRecorrido'].seconds*1000)).getTime()) / (1000*60);
          dato['tiempoTranscurrido'] = parseInt(this.tiempoatencion);
        } 

        if(dato['latlongInicioRecorrido'] != undefined) {
          dato['distancia'] = this.distancia(dato['latlongInicioRecorrido'].split(',')[0],dato['latlongInicioRecorrido'].split(',')[1],dato['latitud'],dato['longitud'])
        }

      })
      
      this.listaAtenciones = atencionesFinalizadas;      
      
    })
    
  }

  exportarDataExcel() {
    this.excelExport.exportAsExcelFile(this.listaAtenciones,"Datos",this.headerInfo);
    
  }

}
