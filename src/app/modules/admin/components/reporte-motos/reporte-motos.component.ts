import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { data } from 'emoji-flags';
import { Observable } from 'rxjs';
import { UnidadesMotos } from 'src/app/core/models/unidadesMotos';
import { ExcelService } from 'src/app/core/services/excel.service';
import * as XLSX from 'xlsx'; 


@Component({
  selector: 'app-reporte-motos',
  templateUrl: './reporte-motos.component.html',
  styleUrls: ['./reporte-motos.component.css']
})
export class ReporteMotosComponent implements OnInit {

  public unidades: UnidadesMotos[] = [];
  itemsRef: AngularFireList<any>;
  items: any;

  miFormulario: FormGroup

  fileName= 'ExcelSheet.xlsx';  

  headerInfo = ['placa', 'nombrePiloto', 'latitud', 'longitud', 'fecha', 'hora'];


  
  constructor(db: AngularFireDatabase, private _builder: FormBuilder, private firestore: AngularFirestore, private excelService:ExcelService) {

    this.items = db.list('SuizaMoto/UnidadesActuales').snapshotChanges().subscribe(values => {
      this.unidades = [];
      values.forEach(value => {

        const itemsUnidades = new UnidadesMotos(value['key'])
        this.unidades.push(itemsUnidades)
        
      })

      this.miFormulario.patchValue({vehiculo: this.unidades[0]['vehiculo']})
      
    });


const currentDate = new Date();

    const fechaActual = formatDate(currentDate, 'yyyy-MM-dd', 'en-US');



    this.miFormulario = this._builder.group({
      vehiculo: ['', Validators.required],
      fechaInicio: [fechaActual, Validators.required],
      fechaFin: [fechaActual, Validators.required]
    })
    
    
    
  }

  ngOnInit(): void {
    
  }

  enviar(values) {

    console.log(values);
    console.log();
    
    console.log(values['fechaFin'].split('-')[0] + '-' + values['fechaFin'].split('-')[1] + '-' + String(Number(values['fechaFin'].split('-')[2])+1) );
    
    let placa = values['vehiculo']
    let start = new Date(values['fechaInicio']);
    let end = new Date(values['fechaFin'].split('-')[0] + '-' + values['fechaFin'].split('-')[1] + '-' + String(Number(values['fechaFin'].split('-')[2])+1) );

    this.firestore.collection('SuizaMoto', ref => ref
      .orderBy('timestamp')
      .where('timestamp', '>', start)
      .where('timestamp', '<=', end)
    ).valueChanges().subscribe(resultado => {

      var valores =  resultado.filter(function(val) {
        return val['placa'] == placa;
      });

      for(let i = 0; i<valores.length; i++) {
        delete valores[i]['timestamp']
      }
      
      this.excelService.exportAsExcelFile(valores, 'Reporte de Motos',this.headerInfo);
      console.log(valores);
      
    })
   
  }

  filterByValue(array, string) {
      return array.filter(o =>
          Object.keys(o).some(k => o[k].toLowerCase().includes(string.toLowerCase())));
  }

  onChange(deviceValue) {
    console.log(deviceValue);
  }

}