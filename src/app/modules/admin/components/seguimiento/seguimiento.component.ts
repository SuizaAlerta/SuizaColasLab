import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ListaUnidades } from 'src/app/core/models/ListaUnidades';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent implements OnInit {

  public usuarios = [];

  latitud = -12.110631;
  longitud = -77.021427;
  zoom=13;

  start_end_mark = [];
  latitudlongitud = [];

  formularioInicial: FormGroup;
  
  constructor(private firestore: AngularFirestore, private db: AngularFireDatabase, private _builder: FormBuilder) {

    const currentDate = new Date();
    const fechaActual = formatDate(currentDate, 'yyyy-MM-dd', 'en-US');

    this.formularioInicial = this._builder.group({
      fecha: [fechaActual, Validators.required],
      motorizado: ['', Validators.required]
    });

    this.db.list('SuizaMoto/Usuarios').valueChanges().subscribe(val => {
      this.usuarios = [];
      val.forEach(user => {
        this.usuarios.push(user)
      })      
      this.formularioInicial.patchValue({motorizado:this.usuarios[0]['nombre']})
    })

    

  }

  ngOnInit(): void {
  }

  cargarFormulario(values) {
    console.log(values);

    this.firestore.collection("AtencionesCurso", ref => ref.where("motorizado","==",values['motorizado']).where("fechaRegistro","==",values['fecha'].split("-")[2] + "-" + values['fecha'].split("-")[1] + "-" + values['fecha'].split("-")[0]) ).valueChanges().subscribe(val => {
      this.latitudlongitud = []


      const data = val.sort((a,b) => a["timestampRegistroLlegada"].seconds < b["timestampRegistroLlegada"].seconds ? -1 : 0)

      console.log(data);
      

      val.forEach(valor => {

        if(valor["estado"] == "Finalizado" || valor["estado"] == "Llegada al Destino") {
          valor['latitudLlegada'] = parseFloat(valor["latlongRegistroLlegada"].split(",")[0])
          valor['longitudLlegada'] = parseFloat(valor["latlongRegistroLlegada"].split(",")[1])
          this.latitudlongitud.push(valor)
        }
       
      })

      this.start_end_mark.push(this.latitudlongitud[0]);
      this.start_end_mark.push(this.latitudlongitud[this.latitudlongitud.length - 1]);
      
    })
  } 

}
