import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import * as uuid from 'uuid';
import { FileUpload } from 'src/app/core/models/fileUpload';
import { StorageService } from 'src/app/core/services/storage.service';


@Component({
  selector: 'app-reporte-piloto-v2',
  templateUrl: './reporte-piloto-v2.component.html',
  styleUrls: ['./reporte-piloto-v2.component.css']
})
export class ReportePilotoV2Component implements OnInit {

  title: string;
  opcion: number = 1;

  formularioInicial: FormGroup;
  formularioTermino: FormGroup;

  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  percentage: number;

  porcentajeFrontal: number;
  porcentajeIzquierda: number;
  porcentajeDerecha: number;
  porcentajePosterior: number;
  
  public habilitadorMotor = false;
  public habilitadorSistemaElectrico = false;
  public habilitadorSuspensionDireccion = false;
  public habilitadorCajaCambios = false;
  public habilitadorFrenos = false;
  public habilitadorEstadoCombustible = false;
  
  public fechaInicio: string;
  public nombrePiloto: string;

  public tipoCombustible: string;
  public tipoVehiculo: string;
  public vehiculo: string;

  public uid: string;

  kmSalida: number;

  mensajeInicio = true;
  inicioReporte = false;

  mensajeTermino = false;
  terminoReporte = false;

  vehiculosDatos: AngularFireObject<any>;
  itemFotos: any;
  informacionUnidad: AngularFireObject<any>;

  constructor(private _builder: FormBuilder, private router: Router,  private _route: ActivatedRoute, private db: AngularFireDatabase, private firestore: AngularFirestore, private uploadService: StorageService) {
    this.title = "Prueba"

    this.fechaInicio = formatDate(new Date(), 'dd-MM-yyyy', 'en-US');
    console.log(this.fechaInicio);

    const currentDate = new Date();


    const fechaActual = formatDate(currentDate, 'yyyy-MM-dd', 'en-US');
    const fechaSistema = formatDate(currentDate, 'dd/MM/yyyy', 'en-US');
    const horaActual = formatDate(currentDate, 'HH:mm', 'en-US');

    this._route.data.subscribe((data: { user: User }) => {
      this.nombrePiloto = data.user['nombre'];
      
    }, err => { console.log("Error hub:", err) });

    

    this.formularioInicial = this._builder.group({
      vehiculo: ['', Validators.required],
      placa:['',Validators.required],
      tipoVehiculo:['',Validators.required],
      nombrePiloto: [this.nombrePiloto,Validators.required],
      fechaSistema:[fechaSistema,Validators.required],
      horaSistema: [horaActual, Validators.required],
      fechaSalida: [fechaActual, Validators.required],
      horaSalida: [horaActual, Validators.required],
      kmSalida: ['', Validators.required],
      fechaLlegada: [fechaActual, Validators.required],
      horaLlegada: ['', Validators.required],
      kmLlegada: ['', Validators.required],
      llenadoCombustible: ['', Validators.required],
      tipoCombustible: ['', Validators.required],
      gasolinera: ['', Validators.required],
      gasolineraKilometraje: ['', Validators.required],
      gasolineraGalones: ['', Validators.required],
      gasolineraTotal: ['', Validators.required],
      combustibleSalida: ['', Validators.required],
      combustibleLlegada: ['', Validators.required],
      aceite: ['', Validators.required],
      refrigerante: ['', Validators.required],
      hidrolina: ['', Validators.required],
      liquidoFreno: ['', Validators.required],
/*       presionLlantaFrontalIzq: ['', Validators.required],
      presionLlantaFrontalDer: ['', Validators.required],
      presionLlantaPosteriorIzq: ['', Validators.required],
      presionLlantaPosteriorDer: ['', Validators.required],
      presionLlantaRepuesto: ['', Validators.required], */
      motor: ['', Validators.required],
      sistemaElectrico: ['', Validators.required],
      suspensionDireccion: ['', Validators.required],
      cajaCambios: ['', Validators.required],
      frenos: ['', Validators.required],
      motorObservacion: ['', Validators.required],
      sistemaElectricoObservacion: ['', Validators.required],
      suspensionDireccionObservacion: ['', Validators.required],
      cajaCambiosObservacion: ['', Validators.required],
      frenosObservacion: ['', Validators.required],
      gata: [true],
      llaveRueda: [true],
      palanca: [true],
      seguroRuedas: [true],
      dadoPrueda: [true],
      alicate: [true],
      tapa: [true],
      destornillador: [true],
      medidorAire: [true],
      tarjetaPropiedad: [true],
      soat: [true],
      revisionTecnica: [true],
      ploteoFrontal:['',Validators.required],
      ploteoIzquierdo:['',Validators.required],
      ploteoDerecho:['',Validators.required],
      ploteoPosterior:['',Validators.required],
      ladoFrontal:[[], Validators.minLength(1)],
      ladoIzquierdo:[[], Validators.minLength(1)],
      ladoDerecho:[[], Validators.minLength(1)],
      ladoPosterior:[[], Validators.minLength(1)],
      validadorFrontal:['',Validators.required],
      validadorIzquierdo:['',Validators.required],
      validadorDerecho:['',Validators.required],
      validadorPosterior:['',Validators.required]
    })

    this.formularioTermino =  this._builder.group({
      vehiculo: ['', Validators.required],
      placa:['',Validators.required],
      /* tipoVehiculo:['',Validators.required], */
      nombrePiloto: [this.nombrePiloto,Validators.required],
      fechaSistema:[fechaSistema,Validators.required],
      horaSistema: [horaActual, Validators.required],
      fechaLlegada: [fechaActual, Validators.required],
      horaLlegada: [horaActual, Validators.required],
      kmLlegada: ['', Validators.required],
      llenadoCombustible: ['', Validators.required],
      /* tipoCombustible: ['', Validators.required], */
      gasolinera: ['', Validators.required],
      gasolineraKilometraje: ['', Validators.required],
      gasolineraGalones: ['', Validators.required],
      gasolineraTotal: ['', Validators.required],
      combustibleLlegada: ['', Validators.required],
/*       presionLlantaFrontalIzq: ['', Validators.required],
      presionLlantaFrontalDer: ['', Validators.required],
      presionLlantaPosteriorIzq: ['', Validators.required],
      presionLlantaPosteriorDer: ['', Validators.required],
      presionLlantaRepuesto: ['', Validators.required], */
      motor: ['', Validators.required],
      sistemaElectrico: ['', Validators.required],
      suspensionDireccion: ['', Validators.required],
      cajaCambios: ['', Validators.required],
      frenos: ['', Validators.required],
      motorObservacion: ['', Validators.required],
      sistemaElectricoObservacion: ['', Validators.required],
      suspensionDireccionObservacion: ['', Validators.required],
      cajaCambiosObservacion: ['', Validators.required],
      frenosObservacion: ['', Validators.required],
      ploteoFrontal:['',Validators.required],
      ploteoIzquierdo:['',Validators.required],
      ploteoDerecho:['',Validators.required],
      ploteoPosterior:['',Validators.required],
      ladoFrontal:[[]],
      ladoIzquierdo:[[]],
      ladoDerecho:[[]],
      ladoPosterior:[[]],
      validadorFrontal:['',Validators.required],
      validadorIzquierdo:['',Validators.required],
      validadorDerecho:['',Validators.required],
      validadorPosterior:['',Validators.required]

    })
   }

  ngOnInit(): void {

    this.firestore.collection('consolidadoUME', ref => ref.where('nombrePiloto','==', this.nombrePiloto).where('horaLlegada','==','')).valueChanges().subscribe(val => {

      if(val.length == 0) {
        this.mensajeInicio = true;
        this.mensajeTermino = false;
        this.inicioReporte = false;
        this.terminoReporte = false;

      } else {
        this.mensajeInicio = false;
        this.mensajeTermino = true;
        this.inicioReporte = false;
        this.terminoReporte = false;


        this.tipoCombustible = val[0]['tipoCombustible'];

        this.formularioTermino.patchValue({vehiculo: val[0]['vehiculo']})
        this.formularioTermino.patchValue({placa: val[0]['placa']})

        this.vehiculosDatos = this.db.object('SuizaAlertaApp/EvidenciaUME/'+val[0]['vehiculo']);

        console.log("Valor del vehiculo " + val[0]['vehiculo']);
        
        this.uid = val[0]['uid'];


        this.vehiculosDatos = this.db.object('SuizaAlertaApp/EvidenciaUME/'+this.formularioTermino.value.vehiculo);
          this.itemFotos = this.vehiculosDatos.valueChanges().subscribe(value => {
            
            if(value.frontal.url != "" || value.frontal.url == undefined){
              this.formularioTermino.patchValue({ladoFrontal: value.frontal.url})
            }
            if(value.izquierda.url != "" || value.izquierda.url == undefined){
              this.formularioTermino.patchValue({ladoIzquierdo: value.izquierda.url})
            }
            if(value.derecha.url != "" || value.derecha.url == undefined){
              this.formularioTermino.patchValue({ladoDerecho: value.derecha.url})
            }
            if(value.posterior.url != "" || value.posterior.url == undefined){
              this.formularioTermino.patchValue({ladoPosterior: value.posterior.url})
            }
      })

      }
      
    });

  }

  cargarPrimerFormulario(values) {
    const today = new Date();
    const horaSistema = formatDate(today, 'HH:mm:ss', 'en-US');
    
    const myId = uuid.v4();

    values['timestamp']= firestore.Timestamp.fromDate(today);
    values['uid']= myId;
    values['horaSistema'] = horaSistema;
    
    this.firestore.collection('listaReportePiloto').doc(myId).set(values);
    this.firestore.collection('consolidadoUME').doc(values['vehiculo']).set(values);

    this.db.database.ref('SuizaAlertaApp/informacionUME/'+values['vehiculo']).child('kmSalida').set(values['kmLlegada'])
    this.db.database.ref('SuizaAlertaApp/informacionUME/'+values['vehiculo']).child('combustibleSalida').set(values['combustibleLlegada'])

    this.router.navigate(['/pilotos/carga-exitosa']);
    this.formularioInicial.reset();
    
  }

  cargarSegundoFormulario(values) {

    const myId = this.uid;

    this.firestore.collection('listaReportePiloto').doc(myId).update(values);
    this.firestore.collection('consolidadoUME').doc(values['vehiculo']).update(values);

    this.db.database.ref('SuizaAlertaApp/informacionUME/'+values['vehiculo']).child('kmSalida').set(values['kmLlegada'])
    this.db.database.ref('SuizaAlertaApp/informacionUME/'+values['vehiculo']).child('combustibleSalida').set(values['combustibleLlegada'])

    this.vehiculosDatos.set({frontal:"",izquierda:"",derecha:"",posterior:""})
    
    this.router.navigate(['/pilotos/carga-exitosa']);
    this.formularioTermino.reset();

  }

  IniciarReporte(){
    this.mensajeInicio = false;
    this.inicioReporte = true;
  }

  FinalizarReporte(){
    this.mensajeTermino = false;
    this.terminoReporte = true;
  }

  itemsMenu(valor){
    this.opcion = valor;
    switch(valor) {
      case '1': {
        this.title = "Reporte del Piloto";
        break;
      }

      case '2': {
        this.title = "Inspección Diaria";
        break;
      }

      case '3': {
        this.title = "Evaluación UME";
        break;
      }

      case '4': {
        this.title = "Inspección Externa";
        break;
      }
    }
  }

  onChangeUnidad(deviceValue) {
    this.informacionUnidad = this.db.object('SuizaAlertaApp/informacionUME/'+deviceValue);
    this.informacionUnidad.snapshotChanges().subscribe(action => {

      this.tipoCombustible = action.payload.val()['tipoCombustible'];  
      this.tipoVehiculo = action.payload.val()['tipoVehiculo']    
      this.kmSalida = action.payload.val()['kmSalida']

      this.formularioInicial.patchValue({placa: action.payload.val()['placa']})
      this.formularioInicial.patchValue({tipoVehiculo: this.tipoVehiculo})
      this.formularioInicial.patchValue({tipoCombustible: this.tipoCombustible})
      this.formularioInicial.patchValue({kmSalida: this.kmSalida})
      this.formularioInicial.patchValue({combustibleSalida: action.payload.val()['combustibleSalida']})

    })
  }

  onChangeMotor(value, comparador){
    this.habilitadorMotor = value
    if(comparador == "Conforme"){
      this.formularioTermino.patchValue({motorObservacion: "Conforme"})
    } else {
      this.formularioTermino.patchValue({motorObservacion: ""})
    }

  }

  onChangeSistemaElectrico(value, comparador){
    this.habilitadorSistemaElectrico = value;
    if(comparador == "Conforme"){
      this.formularioTermino.patchValue({sistemaElectricoObservacion: "Conforme"})
    } else {
      this.formularioTermino.patchValue({sistemaElectricoObservacion: ""})
    }
  }

  onChangesuspensionDireccion(value, comparador){
    this.habilitadorSuspensionDireccion = value;
    if(comparador == "Conforme"){
      this.formularioTermino.patchValue({suspensionDireccionObservacion: "Conforme"})
    } else {
      this.formularioTermino.patchValue({suspensionDireccionObservacion: ""})
    }
    
  }

  onChangecajaCambios(value, comparador){
    this.habilitadorCajaCambios = value;
    if(comparador == "Conforme"){
      this.formularioTermino.patchValue({cajaCambiosObservacion: "Conforme"})
    } else {
      this.formularioTermino.patchValue({cajaCambiosObservacion: ""})
    }
  }

  onChangefrenos(value, comparador) {
    this.habilitadorFrenos = value;
    if(comparador == "Conforme"){
      this.formularioTermino.patchValue({frenosObservacion: "Conforme"})
    } else {
      this.formularioTermino.patchValue({frenosObservacion: ""})
    }
    
  }

  onChangeLlenadoCombustible(value, comparador) {

    this.habilitadorEstadoCombustible = value;
    if(comparador == "Si"){
      this.formularioTermino.patchValue({llenadoCombustible: "Si"})
      this.formularioTermino.patchValue({gasolinera: ""})
      this.formularioTermino.patchValue({gasolineraKilometraje: ""})
      this.formularioTermino.patchValue({gasolineraGalones: ""})
      this.formularioTermino.patchValue({gasolineraTotal: ""})
    } else {
      this.formularioTermino.patchValue({llenadoCombustible: "No"})
      this.formularioTermino.patchValue({gasolinera: "0"})
      this.formularioTermino.patchValue({gasolineraKilometraje: "0"})
      this.formularioTermino.patchValue({gasolineraGalones: "0"})
      this.formularioTermino.patchValue({gasolineraTotal: "0"})
    }

  }

  ladoFrontal(event): void {
    this.selectedFiles = event.target.files;
    this.upload('frontal')
  }

  ladoIzquierdo(event): void {
    this.selectedFiles = event.target.files;
    this.upload('izquierda')
  }

  ladoDerecho(event): void {
    this.selectedFiles = event.target.files;
    this.upload('derecha')

  }

  ladoPosterior(event): void {
    this.selectedFiles = event.target.files;
    this.upload('posterior')

  }

  ploteoFrontal(value){
    this.formularioTermino.patchValue({ploteoFrontal: value})
  }

  ploteoIzquierdo(value){
    this.formularioTermino.patchValue({ploteoIzquierdo: value})
  }

  ploteoDerecho(value){
    this.formularioTermino.patchValue({ploteoDerecho: value})
  }

  ploteoPosterior(value){
    this.formularioTermino.patchValue({ploteoPosterior: value})
  }

  upload(posicion:string): void {
    const file = this.selectedFiles.item(0);
/*     this.formularioTermino = undefined;
 */

    console.log(this.formularioTermino.value.vehiculo);
    

    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload, posicion, this.formularioTermino.value.vehiculo, this.uid).subscribe(
      percentage => {


        if(posicion == "frontal") {
          this.porcentajeFrontal = Math.round(percentage);
         
        } else if (posicion == "izquierda") {
          this.porcentajeIzquierda = Math.round(percentage);
         
        } else if (posicion == "derecha") {
          this.porcentajeDerecha = Math.round(percentage);
          
        } else if (posicion == "posterior") {
          this.porcentajePosterior = Math.round(percentage);
          
        }
      },
      error => {
      }
    );
  }

}