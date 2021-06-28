import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { firestore } from 'firebase/app';
import * as uuid from 'uuid';
import { formatDate } from '@angular/common';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { FileUpload } from 'src/app/core/models/fileUpload';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-reporte-piloto',
  templateUrl: './reporte-piloto.component.html',
  styleUrls: ['./reporte-piloto.component.css']
})
export class ReportePilotoComponent implements OnInit {

  public nombrePiloto: string;

  opcion: number = 1;

  public title: string = "Reporte del Piloto";

  miFormulario: FormGroup
  todayDate : Date = new Date();

  item: AngularFireObject<any>;

  // Se carga el acchivo al Storage

  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  percentage: number;
  kmSalida: number;

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

  public tipoCombustible: string;
  public tipoVehiculo: string;
  public vehiculo: string;

  vehiculosDatos: AngularFireObject<any>;
  itemFotos: any;


  constructor(
    private _builder: FormBuilder, private firestore: AngularFirestore,private router: Router, private _route: ActivatedRoute, private db: AngularFireDatabase, private storage: AngularFireStorage, private uploadService: StorageService, private cd: ChangeDetectorRef
  ) {

    const currentDate = new Date();

    const fechaActual = formatDate(currentDate, 'yyyy-MM-dd', 'en-US');
    const fechaSistema = formatDate(currentDate, 'dd/MM/yyyy', 'en-US');
    const horaActual = formatDate(currentDate, 'HH:mm', 'en-US');


    this._route.data.subscribe((data: { user: User }) => {
      this.nombrePiloto = data.user['nombre'];
      
    }, err => { console.log("Error hub:", err) });

    this.miFormulario = this._builder.group({
      vehiculo: ['', Validators.required],
      placa:['',Validators.required],
      tipoVehiculo:['',Validators.required],
      nombrePiloto: [this.nombrePiloto,Validators.required],
      fechaSistema:[fechaSistema,Validators.required],
      horaSistema: [horaActual, Validators.required],
      fechaSalida: [fechaActual, Validators.required],
      horaSalida: ['', Validators.required],
      kmSalida: ['', Validators.required],
      fechaLlegada: [fechaActual, Validators.required],
      horaLlegada: [horaActual, Validators.required],
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
      presionLlantaFrontalIzq: ['', Validators.required],
      presionLlantaFrontalDer: ['', Validators.required],
      presionLlantaPosteriorIzq: ['', Validators.required],
      presionLlantaPosteriorDer: ['', Validators.required],
      presionLlantaRepuesto: ['', Validators.required],
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

    
  


  }

  ngOnInit(): void {

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

  onChange(deviceValue) {
    console.log(deviceValue);
    this.vehiculo = deviceValue;

    this.vehiculosDatos = this.db.object('SuizaAlertaApp/EvidenciaUME/'+this.vehiculo);
    this.itemFotos = this.vehiculosDatos.valueChanges().subscribe(value => {
      console.log(value);
      
    if(value.frontal.url != "" || value.frontal.url == undefined){
      this.miFormulario.patchValue({ladoFrontal: value.frontal.url})
    }
    if(value.izquierda.url != "" || value.izquierda.url == undefined){
      this.miFormulario.patchValue({ladoIzquierdo: value.izquierda.url})
    }
    if(value.derecha.url != "" || value.derecha.url == undefined){
      this.miFormulario.patchValue({ladoDerecho: value.derecha.url})
    }
    if(value.posterior.url != "" || value.posterior.url == undefined){
      this.miFormulario.patchValue({ladoPosterior: value.posterior.url})
    }
    
    })
    
    this.item = this.db.object('SuizaAlertaApp/informacionUME/'+deviceValue);
    this.item.snapshotChanges().subscribe(action => {

      this.tipoCombustible = action.payload.val()['tipoCombustible'];  
      this.tipoVehiculo = action.payload.val()['tipoVehiculo']    

      console.log(this.tipoVehiculo);  
      
      this.kmSalida = action.payload.val()['kmSalida']
      this.miFormulario.patchValue({placa: action.payload.val()['placa']})
      this.miFormulario.patchValue({tipoVehiculo: this.tipoVehiculo})
      this.miFormulario.patchValue({tipoCombustible: this.tipoCombustible})
      this.miFormulario.patchValue({kmSalida: this.kmSalida})
      this.miFormulario.patchValue({combustibleSalida: action.payload.val()['combustibleSalida']})

    })
  }

  onChangeMotor(value, comparador){
    this.habilitadorMotor = value
    if(comparador == "Conforme"){
      this.miFormulario.patchValue({motorObservacion: "Conforme"})
    } else {
      this.miFormulario.patchValue({motorObservacion: ""})
    }

  }

  onChangeSistemaElectrico(value, comparador){
    this.habilitadorSistemaElectrico = value;
    if(comparador == "Conforme"){
      this.miFormulario.patchValue({sistemaElectricoObservacion: "Conforme"})
    } else {
      this.miFormulario.patchValue({sistemaElectricoObservacion: ""})
    }
  }

  onChangesuspensionDireccion(value, comparador){
    this.habilitadorSuspensionDireccion = value;
    if(comparador == "Conforme"){
      this.miFormulario.patchValue({suspensionDireccionObservacion: "Conforme"})
    } else {
      this.miFormulario.patchValue({suspensionDireccionObservacion: ""})
    }
    
  }

  onChangecajaCambios(value, comparador){
    this.habilitadorCajaCambios = value;
    if(comparador == "Conforme"){
      this.miFormulario.patchValue({cajaCambiosObservacion: "Conforme"})
    } else {
      this.miFormulario.patchValue({cajaCambiosObservacion: ""})
    }
  }

  onChangefrenos(value, comparador) {
    this.habilitadorFrenos = value;
    if(comparador == "Conforme"){
      this.miFormulario.patchValue({frenosObservacion: "Conforme"})
    } else {
      this.miFormulario.patchValue({frenosObservacion: ""})
    }
    
  }

  onChangeLlenadoCombustible(value, comparador) {

    this.habilitadorEstadoCombustible = value;
    if(comparador == "Si"){
      this.miFormulario.patchValue({llenadoCombustible: "Si"})
      this.miFormulario.patchValue({gasolinera: ""})
      this.miFormulario.patchValue({gasolineraKilometraje: ""})
      this.miFormulario.patchValue({gasolineraGalones: ""})
      this.miFormulario.patchValue({gasolineraTotal: ""})
    } else {
      this.miFormulario.patchValue({llenadoCombustible: "No"})
      this.miFormulario.patchValue({gasolinera: "0"})
      this.miFormulario.patchValue({gasolineraKilometraje: "0"})
      this.miFormulario.patchValue({gasolineraGalones: "0"})
      this.miFormulario.patchValue({gasolineraTotal: "0"})
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
    this.miFormulario.patchValue({ploteoFrontal: value})
  }

  ploteoIzquierdo(value){
    this.miFormulario.patchValue({ploteoIzquierdo: value})
  }

  ploteoDerecho(value){
    this.miFormulario.patchValue({ploteoDerecho: value})
  }

  ploteoPosterior(value){
    this.miFormulario.patchValue({ploteoPosterior: value})
  }

  upload(posicion:string): void {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload, posicion, this.vehiculo, uuid).subscribe(
      percentage => {
        /* this.percentage = Math.round(percentage); */


        if(posicion == "frontal") {
          this.porcentajeFrontal = Math.round(percentage);
          /* if(this.porcentajeFrontal == 100) {
            this.miFormulario.patchValue({ladoFrontal: this.uploadService.getFotoFrontal()})
          } */
        } else if (posicion == "izquierda") {
          this.porcentajeIzquierda = Math.round(percentage);
          /* if(this.porcentajeIzquierda == 100) {
            this.miFormulario.patchValue({ladoIzquierdo: this.uploadService.getFotoIzquierda()})
          } */
        } else if (posicion == "derecha") {
          this.porcentajeDerecha = Math.round(percentage);
          /* if(this.porcentajeDerecha == 100) {
            this.miFormulario.patchValue({ladoDerecho: this.uploadService.getFotoDerecha()})
          } */
        } else if (posicion == "posterior") {
          this.porcentajePosterior = Math.round(percentage);
          /* if(this.porcentajePosterior == 100) {
            this.miFormulario.patchValue({ladoPosterior: this.uploadService.getFotoPosterior()})
          } */
        }
      },
      error => {
      }
    );
  }

  enviar(values) {
    const today = new Date();
    const horaSistema = formatDate(today, 'HH:mm', 'en-US');
    
    const myId = uuid.v4();
    values['timestamp']= firestore.Timestamp.fromDate(today);
    values['uid']= myId;
    values['horaSistema'] = horaSistema;
    
    this.firestore.collection('listaReportePiloto').doc(myId).set(values);
    this.firestore.collection('consolidadoUME').doc(values['vehiculo']).set(values);

    this.db.database.ref('SuizaAlertaApp/informacionUME/'+values['vehiculo']).child('kmSalida').set(values['kmLlegada'])
    this.db.database.ref('SuizaAlertaApp/informacionUME/'+values['vehiculo']).child('combustibleSalida').set(values['combustibleLlegada'])

    this.vehiculosDatos.set({frontal:"",izquierda:"",derecha:"",posterior:""})

    this.router.navigate(['/pilotos/carga-exitosa']);
    this.miFormulario.reset();
  }

}