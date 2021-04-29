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
  
  constructor(
    private _builder: FormBuilder, private firestore: AngularFirestore,private router: Router, private _route: ActivatedRoute, private db: AngularFireDatabase, private storage: AngularFireStorage, private uploadService: StorageService, private cd: ChangeDetectorRef
  ) {

    
  }

  ngOnInit(): void {

  }

  

}
