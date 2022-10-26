import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExcelService } from 'src/app/core/services/excel.service';

@Component({
  selector: 'app-atenciones-motorizados',
  templateUrl: './atenciones-motorizados.component.html',
  styleUrls: ['./atenciones-motorizados.component.css']
})
export class AtencionesMotorizadosComponent implements OnInit {

  @ViewChild('closebutton') closebutton;

  public usuarios = [];
  public rangoAtenciones: any = [];
  public listadoAtencionesGeneral: any = [];
  public listaAtenciones = [];
  public listaFechas = [];
  mydate: string;
  formularioBuscarMotorizado: FormGroup;

  headerInfo = ['dtInicioRecorrido','codUbicacion','direccion','nombre','placa','distancia','tiempoTranscurrido','comentario','Observacion']


  constructor(private _builder: FormBuilder,private db: AngularFireDatabase, private firestore: AngularFirestore, private excelExport: ExcelService) { 
    
    const today = new Date();
    this.mydate = formatDate(today, 'yyyy-MM-dd', 'en-US');

    this.formularioBuscarMotorizado = this._builder.group({
      DESDE: [this.mydate, Validators.required],
      HASTA: [this.mydate, Validators.required],
      MOTORIZADO: ['', Validators.required],
    });

    this.db.list('SuizaMoto/Usuarios').valueChanges().subscribe(val => {
      this.usuarios = [];
      val.forEach(user => {
        this.usuarios.push(user)
      })      
      this.formularioBuscarMotorizado.patchValue({MOTORIZADO:this.usuarios[0]['nombre']})
    })

  }

  ngOnInit(): void {
  }

  public buscarMotorizado(values) {

    this.rangoAtenciones = values;

    let start = new Date(values.DESDE);
    let end = new Date(values.HASTA);
    end.setDate(end.getDate()+1)
    

    this.firestore.collection('AtencionesCurso', ref => ref.where('timestamp','>',start).where('timestamp','<',end)).valueChanges().subscribe(val => {

      var atencionesFinalizadas = val.filter(data => {
        return data['estado'] == "Finalizado" && data['motorizado'] == values['MOTORIZADO']
      })

      atencionesFinalizadas.forEach( valor => {

        valor["tiempoEspera"] = (new Date(new Date(valor['timestampFinRecorrido'].seconds*1000)).getTime() - new Date(new Date(valor['timestampRegistroLlegada'].seconds*1000)).getTime()) / (1000*60);
        valor["tiempoEspera"] = parseInt(valor["tiempoEspera"])

      })
      

      this.listaAtenciones = atencionesFinalizadas

      this.listaFechas = Array.from(new Set(atencionesFinalizadas.map(item => item["fechaRegistro"])));

      this.listaFechas.forEach(valor => {

        const dataFiltrada = this.listaAtenciones.filter(val => {
          return val.fechaRegistro == valor
        })

        this.listadoAtencionesGeneral[valor] = dataFiltrada


      })

      console.log(this.listaAtenciones);
      console.log(this.listaFechas);

      console.log(this.listadoAtencionesGeneral);
      
      
      
            
    })
    
  }

  exportarDataExcel() {
    this.excelExport.exportAsExcelFile(this.listaAtenciones,"Datos",this.headerInfo);
  }

}
