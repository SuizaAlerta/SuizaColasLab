import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { firestore } from 'firebase/app';
import * as uuid from 'uuid';
import { formatDate } from '@angular/common';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';


@Component({
  selector: 'app-reporte-piloto',
  templateUrl: './reporte-piloto.component.html',
  styleUrls: ['./reporte-piloto.component.css']
})
export class ReportePilotoComponent implements OnInit {

  public nombrePiloto: string;

  opcion: number = 1;

  miFormulario: FormGroup
  todayDate : Date = new Date();

  item: Observable<any>;
  
  constructor(
    private _builder: FormBuilder, private firestore: AngularFirestore,private router: Router, private _route: ActivatedRoute, db: AngularFireDatabase
  ) {

    const currentDate = new Date();

    const fechaActual = formatDate(currentDate, 'yyyy-MM-dd', 'en-US');
    const horaActual = formatDate(currentDate, 'HH:mm', 'en-US');

    this.item = db.object('informacionUME').valueChanges();
    console.log(this.item);
    


    this._route.data.subscribe((data: { user: User }) => {
      this.nombrePiloto = data.user['nombre'];
      
    }, err => { console.log("Error hub:", err) });

    this.miFormulario = this._builder.group({
      numero: ['', Validators.required] ,
      ume: ['', Validators.required],
      placa:[{value:'', disabled: true},Validators.required],
      nombrePiloto: [{value: this.nombrePiloto, disabled: true},Validators.required],
      fechaSalida: [fechaActual, Validators.required],
      horaSalida: ['', Validators.required],
      kmSalida: ['', Validators.required],
      fechaLlegada: [fechaActual, Validators.required],
      horaLlegada: [horaActual, Validators.required],
      kmLlegada: ['', Validators.required],
      combustible: ['', Validators.required],
      aceite: ['', Validators.required],
      refrigerante: ['', Validators.required],
      hidrolina: ['', Validators.required],
      liquidoFreno: ['', Validators.required],
      presionLlantas: ['', Validators.required],
      motor: ['', Validators.required],
      sistemaElectrico: ['', Validators.required],
      suspensionDireccion: ['', Validators.required],
      cajaCambios: ['', Validators.required],
      frenos: ['', Validators.required],
      neumaticos: ['', Validators.required],
      carroceria: ['', Validators.required],
      herramientas: ['', Validators.required],
      docUnidad: ['', Validators.required],
      vasos: ['', Validators.required],
      conformidadPilotoSaliente: ['', Validators.required],
      conformidadPilotoEntrante: ['', Validators.required],
    })


  }

  ngOnInit(): void {
  }

  itemsMenu(valor){
    this.opcion = valor;
  }

  onChange(deviceValue) {
    console.log(deviceValue);

    

  }

  enviar(values) {
    /* var today = new Date();
    const myId = uuid.v4();
    values['fechaSistema']= "Eddy Eduards";
    values['timestamp']= firestore.Timestamp.fromDate(today);
    values['uid']= myId;

    this.firestore.collection('listaReportePiloto').doc(myId).set(values);

    console.log(values); */
       /* this.miFormulario.reset();
    this.router.navigate(['/admin/carga-exitosa']); */

  }
}
