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
import { FileUpload } from '../../models/fileUpload';
import { StorageService } from '../../services/storage.service';


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

  porcentajeFrontal: number;
  porcentajeIzquierda: number;
  porcentajeDerecha: number;
  porcentajePosterior: number;

  public habilitadorMotor = false;
  public habilitadorSistemaElectrico = false;
  public habilitadorSuspensionDireccion = false;
  public habilitadorCajaCambios = false;
  public habilitadorFrenos = false;
  
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
      nombrePiloto: [this.nombrePiloto,Validators.required],
      fechaSistema:[fechaSistema,Validators.required],
      horaSistema: [horaActual, Validators.required],
      fechaSalida: [fechaActual, Validators.required],
      horaSalida: ['', Validators.required],
      kmSalida: ['', Validators.required],
      fechaLlegada: [fechaActual, Validators.required],
      horaLlegada: [horaActual, Validators.required],
      kmLlegada: ['', Validators.required],
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
      gata: [''],
      llaveRueda: [''],
      palanca: [''],
      seguroRuedas: [''],
      dadoPrueda: [''],
      alicate: [''],
      tapa: [''],
      destornillador: [''],
      medidorAire: [''],
      tarjetaPropiedad: [''],
      soat: [''],
      revisionTecnica: [''],
      ladoFrontal:[[], Validators.minLength(1)],
      ladoIzquierdo:[[], Validators.minLength(1)],
      ladoDerecho:[[], Validators.minLength(1)],
      ladoPosterior:[[], Validators.minLength(1)],
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

    this.item = this.db.object('SuizaAlertaApp/informacionUME/'+deviceValue);
    this.item.snapshotChanges().subscribe(action => {
      console.log(action.payload.val()['placa'])
  
      this.miFormulario.patchValue({placa: action.payload.val()['placa']})
      this.miFormulario.patchValue({kmSalida: action.payload.val()['kmSalida']})

      if(action.payload.val()['combustibleSalida'] == '0.25') {
        this.miFormulario.patchValue({combustibleSalida: '1/4'})
      } else if(action.payload.val()['combustibleSalida'] == '0.5') {
        this.miFormulario.patchValue({combustibleSalida: '1/2'})
      } else if(action.payload.val()['combustibleSalida'] == '0.75') {
        this.miFormulario.patchValue({combustibleSalida: '3/4'})
      } else if(action.payload.val()['combustibleSalida'] == '1') {
        this.miFormulario.patchValue({combustibleSalida: '1'})
      }


    })
  }

  onChangeMotor(value, comparador){
    this.habilitadorMotor = value
    if(comparador == "Conforme"){
      this.miFormulario.patchValue({motorObservacion: "Conforme"})
    } else {
      this.miFormulario.patchValue({motorObservacion: ""})
    }
    console.log(comparador);
    


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

  upload(posicion:string): void {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload, posicion).subscribe(
      percentage => {
        /* this.percentage = Math.round(percentage); */

        if(posicion == "frontal") {
          this.porcentajeFrontal = Math.round(percentage);
          if(this.porcentajeFrontal == 100) {
            this.miFormulario.patchValue({ladoFrontal: this.uploadService.getFotoFrontal()})
          }
        } else if (posicion == "izquierda") {
          this.porcentajeIzquierda = Math.round(percentage);
          if(this.porcentajeIzquierda == 100) {
            this.miFormulario.patchValue({ladoIzquierdo: this.uploadService.getFotoIzquierda()})
          }
        } else if (posicion == "derecha") {
          this.porcentajeDerecha = Math.round(percentage);
          if(this.porcentajeDerecha == 100) {
            this.miFormulario.patchValue({ladoDerecho: this.uploadService.getFotoDerecha()})
          }
        } else if (posicion == "posterior") {
          this.porcentajePosterior = Math.round(percentage);
          if(this.porcentajePosterior == 100) {
            this.miFormulario.patchValue({ladoPosterior: this.uploadService.getFotoPosterior()})
          }
        }
        
      },
      error => {
        console.log(error);
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

    console.log(values);
    


    /* this.firestore.collection('listaReportePiloto').doc(myId).set(values);
    this.firestore.collection('consolidadoUME').doc(values['ume']).set(values);

    this.db.database.ref('SuizaAlertaApp/informacionUME/'+values['ume']).child('kmSalida').set(values['kmLlegada'])
    this.miFormulario.reset();
    this.router.navigate(['/admin/carga-exitosa']); */

  }
}
