import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'firebase';
import Swal from 'sweetalert2';
import { ConnectionService } from 'ng-connection-service';  
import * as uuid from 'uuid';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-asignar-atencion',
  templateUrl: './asignar-atencion.component.html',
  styleUrls: ['./asignar-atencion.component.css']
})
export class AsignarAtencionComponent implements OnInit {

  formularioInicial: FormGroup;
  formularioEditar: FormGroup;
  formularioBuscarCodigoReferencia: FormGroup;
  public listaCompleta: any = [];
  public usuarios = [];
  public servicios = [];
  public serviciosBusqueda = [];
  public agencias = [];
  public direcciones: any = [];
  public uidUpdate = '';
  tiempoLlegada: any;
  tiempoEspera: any;
  usuarioCreacion: string = "";

  checkBoxAgencia = false

  btnEnviarVisible = true;
  btnUpdateVisible = false;

  cantidadAtenciones: number = 0;
  cantidadFinalizados: number = 0;
  cantidadPendientes: number = 0;
  cantidadAnulados: number = 0;

  arrayModelo = {'AGENCIA':"", 'DIRECCIONES':[]}

  constructor(private firestore: AngularFirestore, private db: AngularFireDatabase, private _builder: FormBuilder, private _route: ActivatedRoute,private connectionService: ConnectionService, private http : HttpClient) {

    this.formularioInicial = this._builder.group({
      numeroReferencia: ['', Validators.required],
      motorizado: ['', Validators.required],
      estadoChecboxAgencia: [false],
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
      placa: ['', Validators.required],
      latitud: [''],
      longitud: [''],
      agencia: [''],
      agenciadireccion: [''],
      observacion: [''],
      usuarioCreacion: ['']
    });

    this.formularioEditar = this._builder.group({
      numeroReferencia: ['', Validators.required],
      motorizado: ['', Validators.required],
      estadoChecboxAgencia: [''],
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
      placa: ['', Validators.required],
      latitud: [''],
      longitud: [''],
      agencia: [''],
      agenciadireccion: [''],
      observacion: [''],
      usuarioCreacion: ['']
    });


    this.formularioBuscarCodigoReferencia = this._builder.group({
      numeroReferencia: ['', Validators.required]
    })

    this.db.list('SuizaMoto/Usuarios').valueChanges().subscribe(val => {
      this.usuarios = [];
      val.forEach(user => {
        this.usuarios.push(user)
      })

      this.usuarios.sort((a,b) => a['nombre'] < b['nombre'] ? -1:0)
      
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
      this.servicios.sort((a,b) => a['motorizado'] < b['motorizado'] ? -1:0)
    })
    
    this._route.data.subscribe((data: {user: User}) => {
      const user = data.user['nombre']
      this.usuarioCreacion = data.user['nombre'];

      this.formularioInicial.patchValue({usuarioCreacion:user})
      
    })

  }

  ngOnInit(): void {

    setInterval(() => {

      const tiempoActual = new Date();
      this.cantidadAtenciones = 0;
      this.cantidadFinalizados = 0;
      this.cantidadPendientes = 0;
      this.cantidadAnulados = 0; 

      this.cantidadAtenciones = this.servicios.length

      this.servicios.forEach( val => {

      if(val['estado'] == 'Finalizado') {
        this.cantidadFinalizados = this.cantidadFinalizados + 1;
      } else if(val['estado'] == 'Activo' || val['estado'] == 'En Curso' || val['estado'] == 'Llegada al Destino') {
        this.cantidadPendientes = this.cantidadPendientes + 1;
      } else if(val['estado'] == 'Anulado') {
        this.cantidadAnulados = this.cantidadAnulados + 1;
      }
      

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

  Buscar() {

    if(this.formularioInicial.get('numeroReferencia').value != "") {

      this.db.list('SuizaMoto/Usuarios', ref => ref.orderByChild('nombre').equalTo(this.formularioInicial.get('motorizado').value)).valueChanges().subscribe(val => {
        if(val != null) {
          
          this.formularioInicial.patchValue({placa:val[0]['placa']})
        }
      })

      this.db.object('SuizaMotoUbicaciones/CodReferencia/' + this.formularioInicial.get('numeroReferencia').value).valueChanges().subscribe( val => {
        if(val != null) {

          this.listaCompleta = val;
          this.listaCompleta['UbicacionGeneral'] = val['departamento'] + "/" + val["provincia"] + "/" + val["distritoRecojo"]

          this.formularioInicial.patchValue(val)
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
    values.usuarioCreacion = this.usuarioCreacion;

    if(values.observacion == null) {
      values.observacion = "";
    }

    if(!values.estadoChecboxAgencia) {
      values.agencia = "";
      values.agenciadireccion = "";
    }

    if(values.agencia == null || values.agenciadireccion == null) {
      values.agencia = "";
      values.agenciadireccion = "";
    }

    const token = this.usuarios.find(x => x.nombre == values.motorizado).token;

    if(token != undefined) {
      this.db.object("SuizaMoto/EnvioNotificaciones").set({dtEnvio:new Date().getTime(),token:token});
    }

    

    this.firestore.collection('AtencionesCurso').doc(myId).set(values).then(() => {
      Swal.fire(
        'Pedido Registrado Correctamente!',
        '',
        'success'
      )
    }).catch((error) => {
      console.log("Ha ocurrido un error" + error);
      
    })


    this.formularioInicial.reset();

    this.checkBoxAgencia = false;

  }

  cargarFormularioEditar(values) {
    console.log(values);
    
  }

  buscarCodigoReferencia(values) {
    this.firestore.collection('AtencionesCurso', ref => ref.where('numeroReferencia','==',values['numeroReferencia'].toUpperCase())).valueChanges().subscribe(val => {
      this.serviciosBusqueda = val; 
      this.serviciosBusqueda.forEach(val => {
        this.tiempoLlegada = (new Date(new Date(val['timestampRegistroLlegada'].seconds*1000)).getTime() - new Date(new Date(val['timestampInicioRecorrido'].seconds*1000)).getTime()) / (1000*60);
        this.tiempoEspera = (new Date(new Date(val['timestampFinRecorrido'].seconds*1000)).getTime() - new Date(new Date(val['timestampRegistroLlegada'].seconds*1000)).getTime()) / (1000*60);
        val['tiempoLlegada'] = parseInt(this.tiempoLlegada)
        val['tiempoEspera'] = parseInt(this.tiempoEspera)
      })
      this.serviciosBusqueda.sort((a,b) => (a['timestampFinRecorrido'] < b['timestampFinRecorrido'] ? 1 : -1))
      /* const ordenamiento = val.sort((a,b) => (a['timestamp'] < b['timestamp'] ? -1 : 1))
      this.servicios = ordenamiento;
      this.servicios.sort((a,b) => a['motorizado'] < b['motorizado'] ? -1:0) */
    })
    
  }

  checkboxAgencia(value: any) {
    this.checkBoxAgencia = value.target.checked
  }

  seleccionarAgencia(value: any) {
    const listaDirecciones = this.agencias.find( valor => valor['AGENCIA'] === value.target.value)
    this.direcciones = listaDirecciones;
    this.formularioInicial.patchValue({agencia: value.target.value, agenciadireccion: this.direcciones["DIRECCIONES"][0] })    
  }

  seleccionarEventMotorizado(value: any) {
    
    this.db.list('SuizaMoto/Usuarios', ref => ref.orderByChild('nombre').equalTo(value.target.value)).valueChanges().subscribe(val => {
      if(val != null) {
        
        this.formularioInicial.patchValue({placa:val[0]['placa']})
      }
    })

  }

  seleccionarEventNumeroReferencia(value: any) {

    this.db.object('SuizaMotoUbicaciones/CodReferencia/' + value.target.value).valueChanges().subscribe( val => {
      if(val != null) {

        this.listaCompleta = val;
        this.listaCompleta['UbicacionGeneral'] = val['departamento'] + "/" + val["provincia"] + "/" + val["distritoRecojo"]

        this.formularioInicial.patchValue(val)
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Número de Referencia no registrado!'
        })
        
      }
    })
    
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
    /* this.firestore.collection('AtencionesCurso').doc(value).valueChanges().subscribe(val => {
      this.formularioInicial.patchValue(val);
      this.uidUpdate = val['uid']
      this.btnEnviarVisible = false;
      this.btnUpdateVisible = true;
    }) */

    this.firestore.collection("AtencionesCurso").doc(value).valueChanges().subscribe(val => {
      console.log(val);
      
      this.formularioEditar.patchValue(val)
    })

    
    console.log("Se debe de Editar");
    
  }
  
  async Eliminar(uid) {

    const { value: text } = await Swal.fire({
      input: 'textarea',
      inputLabel: 'Para anular debe ingresar un motivo',
      inputPlaceholder: 'Ingresar motivo...',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: true
    })
    
    if (text) {
      console.log(uid);
      this.firestore.collection('AtencionesCurso').doc(uid).update({motivo: text, estado: "Anulado"}).then(() => {
        Swal.fire(
          'Anulado!',
          'El número de Referencia fue Anulado de manera exitosa.',
          'success'
        )
      })
    } else {
      console.log("no ha ingresado el motivo");
      Swal.fire(
        'Cancel',
        'No se eliminó ningun registro.',
        'error'
      )
    }
    

    /* if(confirm("¿Desea eliminar el registro?")) {
      this.firestore.collection('AtencionesCurso').doc(value).delete();
    } else {
      
    } */
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


        /* this.db.object('SuizaMotoUbicaciones/CodReferencia').remove() */
        valores.forEach(val => {
          this.db.object('SuizaMotoUbicaciones/CodReferencia/'+val["numeroReferencia"]).set(val)
        }) 
  
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
