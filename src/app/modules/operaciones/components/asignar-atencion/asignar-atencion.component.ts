import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SimpleOuterSubscriber } from 'rxjs/internal/innerSubscribe';
import * as uuid from 'uuid';

import * as XLSX from 'xlsx';

type AOA = any[][];

@Component({
  selector: 'app-asignar-atencion',
  templateUrl: './asignar-atencion.component.html',
  styleUrls: ['./asignar-atencion.component.css']
})
export class AsignarAtencionComponent implements OnInit {

  formularioInicial: FormGroup;
  public listaCompleta: any = [];
  public usuarios = [];
  public servicios = [];
  public agencias = [];
  public direcciones: any = [];
  public uidUpdate = '';
  tiempoLlegada: any;
  tiempoEspera: any;

  checkBoxAgencia = false

  btnEnviarVisible = true;
  btnUpdateVisible = false;



  arrayModelo = {'AGENCIA':"", 'DIRECCIONES':[]}

  constructor(private firestore: AngularFirestore, private db: AngularFireDatabase, private _builder: FormBuilder,) {

    this.formularioInicial = this._builder.group({
      numeroReferencia: ['', Validators.required],
      motorizado: ['', Validators.required],
      direccion: [''],
      direccionRecojo: ['', Validators.required],
      distrito: [''],
      distritoRecojo: [''],
      departamento: [''],
      provincia: [''],
      razonSocial: [''],
      ruc: [''],
      tarifa: [''],
      telefono: [''],
      fechaInscripcion: [''],
      formaPago: [''],
      nombreCompania: [''],
      nomprom: [''],
      nummprom: [''],
      c_celcia: [''],
      c_emacia: [''],
      c_nomcont1: [''],
      placa: [''],
      latitud: [''],
      longitud: [''],
      agencia: [''],
      agenciadireccion: [''],
      observacion: [''],
    });

    this.db.list('SuizaMoto/Usuarios').valueChanges().subscribe(val => {
      this.usuarios = [];
      val.forEach(user => {
        this.usuarios.push(user)
      })      
      
      this.formularioInicial.patchValue({motorizado:this.usuarios[0]['nombre']})
    })

    this.db.list('SuizaMotoUbicaciones/DireccionesAgencias').valueChanges().subscribe(val => {

      this.agencias = val;
      this.direcciones = this.agencias[0];
      

      this.formularioInicial.patchValue({agencia: this.agencias[0]['AGENCIA'], agenciadireccion: this.agencias[0]['DIRECCIONES'][0] })

    })

    this.firestore.collection('AtencionesCurso', ref => ref.where('timestamp','>=',new Date(new Date().setHours(0,0,0,0))).orderBy('timestamp',"desc")).valueChanges().subscribe(val => {
      const ordenamiento = val.sort((a,b) => (a['timestamp'] < b['timestamp'] ? -1 : 1))
      this.servicios = ordenamiento;
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
            
    },10000)
  }

  Buscar() {

    if(this.formularioInicial.get('numeroReferencia').value != "") {

      this.db.list('SuizaMoto/Usuarios', ref => ref.orderByChild('nombre').equalTo(this.formularioInicial.get('motorizado').value)).valueChanges().subscribe(val => {
        if(val != null) {

          console.log(val);
          
          this.formularioInicial.patchValue({placa:val[0]['placa']})
        }
      })

      this.db.object('SuizaMotoUbicaciones/CodReferencia/' + this.formularioInicial.get('numeroReferencia').value).valueChanges().subscribe( val => {
        if(val != null) {

          this.listaCompleta = val;
          this.listaCompleta['UbicacionGeneral'] = val['departamento'] + "/" + val["provincia"] + "/" + val["distritoRecojo"]

          this.formularioInicial.patchValue(val)
          console.log(this.formularioInicial.value);
        }
      })

    }

  }

  cargarPrimerFormulario(values) {

    const myId = uuid.v4();

    values.uid = myId;
    values.estado = 'Activo';
    values.dtInicioRecorrido = '';
    values.dtRegistroLlegada = '';
    values.timestampInicioRecorrido = '';
    values.timestampRegistroLlegada = '';
    values.timestampFinRecorrido = '';
    values.habilitadorAgencia = this.checkBoxAgencia;
    values.timestamp = new Date();
    values.fechaRegistro = formatDate(new Date(),'dd-MM-yyyy','en-US')
    values.horaRegistro = formatDate(new Date(),'HH:mm:ss','en-US')

    if(values.observacion == null) {
      values.observacion = "";
    }

    if(!this.checkBoxAgencia) {
      values.agencia = "";
      values.agenciadireccion = "";
    }

    const token = this.usuarios.find(x => x.nombre == values.motorizado).token;

    if(token != undefined) {
      this.db.object("SuizaMoto/EnvioNotificaciones").set({dtEnvio:new Date().getTime(),token:token});
    }    

    this.firestore.collection('AtencionesCurso').doc(myId).set(values);
    this.formularioInicial.reset();
    
  }

  checkboxAgencia(value: any) {
    this.checkBoxAgencia = value.target.checked
  }

  seleccionarAgencia(value: any) {
    const listaDirecciones = this.agencias.find( valor => valor['AGENCIA'] === value.target.value )
    this.direcciones = listaDirecciones;
    this.formularioInicial.patchValue({agencia: value.target.value, agenciadireccion: this.direcciones["DIRECCIONES"][0] })    
  }

  ActualizarAtencion(){

    if(this.uidUpdate != "") {

      this.formularioInicial.value['habilitadorAgencia'] = this.checkBoxAgencia
      
      this.firestore.collection('AtencionesCurso').doc(this.uidUpdate).update(this.formularioInicial.value).then(() => {
        this.btnEnviarVisible = true;
        this.btnUpdateVisible = false;

        this.formularioInicial.reset();
        this.uidUpdate = "";
      });

    }
  }

  Editar(value) {    
    this.firestore.collection('AtencionesCurso').doc(value).valueChanges().subscribe(val => {
      this.formularioInicial.patchValue(val);
      this.uidUpdate = val['uid']
      this.btnEnviarVisible = false;
      this.btnUpdateVisible = true;
    })
  }
  
  Eliminar(value) {
    if(confirm("¿Desea eliminar el registro?")) {
      this.firestore.collection('AtencionesCurso').doc(value).delete();
    } else {
      console.log("No se elimino");
      
    }
    /* this.firestore.collection('AtencionesCurso').doc(value).delete(); */
  }

  uploadData(evt: any) : void { 

      let workBook = null;
      let jsonData = null;
      const reader = new FileReader();
      const file = evt.target.files[0];
      reader.onload = (event) => {
        const data = reader.result;
        workBook = XLSX.read(data, { type: 'binary' });
        jsonData = workBook.SheetNames.reduce((initial, name) => {
          const sheet = workBook.Sheets[name];
          initial[name] = XLSX.utils.sheet_to_json(sheet);
          return initial;
        }, {});
        const dataString = JSON.stringify(jsonData);

        const valores = jsonData['Hoja1']

        console.log(valores);

        /* this.db.object('SuizaMotoUbicaciones/CodReferencia').remove() */
        valores.forEach(val => {
          this.db.object('SuizaMotoUbicaciones/CodReferencia/'+val["numeroReferencia"]).set(val)
        }) 
  
        /* 
  
  
        valores.forEach(val => {
          console.log(val);
                  
        }) */
        
  
        /* */
  
  
      }
      reader.readAsBinaryString(file);
    
    


    /* const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {

      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));

      this.data.forEach(val => {

        this.arrayModelo['DIRECCIONES'] = []

        for(let i = 0; i < val.length; i++) {

          if(i == 0) {
            this.arrayModelo['AGENCIA'] = val[0]            
          } else {
            this.arrayModelo['DIRECCIONES'].push(val[i])
          }

        }

        this.db.list("SuizaMotoUbicaciones/DireccionesAgencias").push(this.arrayModelo)     
      })

    };
    reader.readAsBinaryString(target.files[0]); */
  }

}
