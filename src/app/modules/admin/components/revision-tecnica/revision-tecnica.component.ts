import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { RevisionTecnica } from 'src/app/core/models/revisionTecnica';
import { ReportePilotoComponent } from '../reporte-piloto/reporte-piloto.component';

@Component({
  selector: 'app-revision-tecnica',
  templateUrl: './revision-tecnica.component.html',
  styleUrls: ['./revision-tecnica.component.css']
})
export class RevisionTecnicaComponent implements OnInit {

  public datosVehiculos: RevisionTecnica[] = [];

  items: any;
  constructor(db: AngularFireDatabase) {

    this.items = db.list('SuizaAlertaApp/informacionUME').valueChanges().subscribe(values => {

      values.forEach(value => {

        const itemsRT = new RevisionTecnica(value['vehiculo'],value['placa'],value['soat'],value['vehiculo'])
        this.datosVehiculos.push(itemsRT)
        
      })
      console.log(this.datosVehiculos);
      
      /* this.datosVehiculos = values; */
    });


  
    var fecha1 = moment('2021-06-25');
    var date = new Date();

    const horaSistema = formatDate(date, 'yyyy-MM-dd', 'en-US');
    console.log(horaSistema);
    
    
    var fecha2 = moment(horaSistema);

    console.log(fecha2.diff(fecha1, 'days'), ' dias de diferencia');
    
  }

  ngOnInit(): void {
  }

}
