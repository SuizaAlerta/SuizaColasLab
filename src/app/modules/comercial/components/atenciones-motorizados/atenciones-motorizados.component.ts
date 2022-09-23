import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-atenciones-motorizados',
  templateUrl: './atenciones-motorizados.component.html',
  styleUrls: ['./atenciones-motorizados.component.css']
})
export class AtencionesMotorizadosComponent implements OnInit {

  public servicios = [];
  tiempoLlegada: any;
  tiempoEspera: any;

  constructor(private firestore: AngularFirestore, private db: AngularFireDatabase,) {
    this.firestore.collection('AtencionesCurso', ref => ref.where('timestamp','>=',new Date(new Date().setHours(0,0,0,0))).orderBy('timestamp',"desc")).valueChanges().subscribe(val => {
      const ordenamiento = val.sort((a,b) => (a['timestamp'] < b['timestamp'] ? -1 : 1))
      this.servicios = ordenamiento;
      this.servicios.sort((a,b) => a['motorizado'] < b['motorizado'] ? -1:0)
    })
  }

  ngOnInit(): void {
    setInterval(() => {

      const tiempoActual = new Date();

      this.servicios.forEach( val => {

        if(val['timestampRegistroLlegada'] != "" && val['timestampFinRecorrido'] != "") {

          this.tiempoLlegada = (new Date(new Date(val['timestampRegistroLlegada'].seconds*1000)).getTime() - new Date(new Date(val['timestampInicioRecorrido'].seconds*1000)).getTime()) / (1000*60);
          this.tiempoEspera = (new Date(new Date(val['timestampFinRecorrido'].seconds*1000)).getTime() - new Date(new Date(val['timestampRegistroLlegada'].seconds*1000)).getTime()) / (1000*60);
          val['tiempoLlegada'] = parseInt(this.tiempoLlegada)
          val['tiempoEspera'] = parseInt(this.tiempoEspera)

        } else if(val['timestampRegistroLlegada'] != "" && val['timestampFinRecorrido'] == "") {

          this.tiempoLlegada = (new Date(new Date(val['timestampRegistroLlegada'].seconds*1000)).getTime() - new Date(new Date(val['timestampInicioRecorrido'].seconds*1000)).getTime()) / (1000*60);
          this.tiempoEspera = (tiempoActual.getTime() - new Date(new Date(val['timestampRegistroLlegada'].seconds*1000)).getTime()) / (1000*60);
          val['tiempoLlegada'] = parseInt(this.tiempoLlegada)
          val['tiempoEspera'] = parseInt(this.tiempoEspera)

        } else if(val['timestampRegistroLlegada'] != "") {

          this.tiempoLlegada = (new Date(new Date(val['timestampRegistroLlegada'].seconds*1000)).getTime() - new Date(new Date(val['timestampInicioRecorrido'].seconds*1000)).getTime()) / (1000*60);
          val['tiempoLlegada'] = parseInt(this.tiempoLlegada)

        } else {

          this.tiempoLlegada = (tiempoActual.getTime() - new Date(new Date(val['timestampInicioRecorrido'].seconds*1000)).getTime()) / (1000*60);
          val['tiempoLlegada'] = parseInt(this.tiempoLlegada)

        }

      })

      this.servicios.sort((a,b) => a['motorizado'] < b['motorizado'] ? -1:0)
            
    },10000) 
  }

}
