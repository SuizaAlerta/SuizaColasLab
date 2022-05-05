import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as uuid from 'uuid';

@Component({
  selector: 'app-asignar-atencion',
  templateUrl: './asignar-atencion.component.html',
  styleUrls: ['./asignar-atencion.component.css']
})
export class AsignarAtencionComponent implements OnInit {

  formularioInicial: FormGroup;
  public usuarios = [];
  public servicios = [];
  public uidUpdate = '';
  tiempoatencion: any;

  constructor(private firestore: AngularFirestore, private db: AngularFireDatabase, private _builder: FormBuilder,) {

    this.formularioInicial = this._builder.group({
      codUbicacion: ['', Validators.required],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      placa: ['', Validators.required],
      latitud: ['', Validators.required],
      longitud: ['', Validators.required],
      comentario: [''],
    });

    this.db.list('SuizaMoto/Usuarios').valueChanges().subscribe(val => {
      this.usuarios = [];
      val.forEach(user => {
        this.usuarios.push(user)
      })      
      console.log(this.usuarios);
      
      this.formularioInicial.patchValue({nombre:this.usuarios[0]['nombre']})
    })

    this.firestore.collection('AtencionesCurso', ref => ref.where('timestamp','>=',new Date(new Date().setHours(0,0,0,0))).orderBy('timestamp',"desc")).valueChanges().subscribe(val => {
      this.servicios = val;
    })

  }

  ngOnInit(): void {

    setInterval(() => {

      const tiempoActual = new Date();

      this.servicios.forEach( val => {

        if(val['timestampFinRecorrido'] != "") {
          this.tiempoatencion = (new Date(new Date(val['timestampFinRecorrido'].seconds*1000)).getTime() - new Date(new Date(val['timestampInicioRecorrido'].seconds*1000)).getTime()) / (1000*60);
            val['tiempoTranscurrido'] = parseInt(this.tiempoatencion);
        } else {
          if(val['timestampInicioRecorrido'] != "") {
            this.tiempoatencion = (tiempoActual.getTime() - new Date(new Date(val['timestampInicioRecorrido'].seconds*1000)).getTime()) / (1000*60);
            val['tiempoTranscurrido'] = parseInt(this.tiempoatencion);
          }
        }

      })
      
      //console.log(this.servicios);
      
    },10000)
  }

  Buscar() {

    this.db.list('SuizaMoto/Usuarios', ref => ref.orderByChild('nombre').equalTo(this.formularioInicial.get('nombre').value)).valueChanges().subscribe(val => {
      if(val != null) {
        this.formularioInicial.patchValue({placa:val[0]['placa']})
      }
    })
 
    this.db.object('SuizaMotoUbicaciones/CodReferencia/' + this.formularioInicial.get('codUbicacion').value).valueChanges().subscribe( val => {
      if(val != null) { 
        this.formularioInicial.patchValue({"direccion":val["Direccion"],"latitud":val["latitud"],"longitud":val["longitud"]})
      }
    })

  }

  cargarPrimerFormulario(values) {

    const myId = uuid.v4();

    values.uid = myId;
    values.estado = 'Activo';
    values.dtInicioRecorrido = '';
    values.timestampInicioRecorrido = '';
    values.timestampFinRecorrido = '';
    values.timestamp = new Date();

    const token = this.usuarios.find(x => x.nombre == values.nombre).token;

    if(token != undefined) {
      this.db.object("SuizaMoto/EnvioNotificaciones").set({dtEnvio:new Date().getTime(),token:token});
    }    

    this.firestore.collection('AtencionesCurso').doc(myId).set(values);
    this.formularioInicial.reset();
    
  }

  ActualizarAtencion(){
    if(this.uidUpdate != "") {
      console.log(this.formularioInicial.value);
      this.firestore.collection('AtencionesCurso').doc(this.uidUpdate).update(this.formularioInicial.value);
      this.uidUpdate = "";
    }
  }

  Editar(value) {
    this.firestore.collection('AtencionesCurso').doc(value).valueChanges().subscribe(val => {
      val['placa'] = null;
      this.formularioInicial.patchValue(val);
      this.uidUpdate = val['uid']
    })
  }
/* 
  Finalizar(value) {
    this.firestore.collection('AtencionesCurso').doc(value).update({estado:"Finalizado"});
  } */

  Eliminar(value) {
    this.firestore.collection('AtencionesCurso').doc(value).delete();
  }

}
