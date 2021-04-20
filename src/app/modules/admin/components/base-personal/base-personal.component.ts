import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { ListaPersonal } from 'src/app/core/models/ListaPersonal';

@Component({
  selector: 'app-base-personal',
  templateUrl: './base-personal.component.html',
  styleUrls: ['./base-personal.component.css']
})
export class BasePersonalComponent implements OnInit {
  
  public listaPersonal: ListaPersonal[] = [];
  basePersonal: any;

  selectedValue: string;

  valorSeleccionado: string;

  itemsRef: AngularFireList<any>;


  constructor(private db: AngularFireDatabase) { }

  ngOnInit(): void {
  }

  cargarBase(){
    
    this.valorSeleccionado = this.selectedValue;
    console.log(this.selectedValue);
    

    this.itemsRef = this.db.list('SuizaAlertaApp/basePersonal/' + this.selectedValue); 
    this.itemsRef.snapshotChanges()
    .subscribe(async actions => {
      this.listaPersonal = [];

      if (this.selectedValue == 'Medicos') {
        actions.forEach(action => {
          const valor = new ListaPersonal(action.payload.val()['idMedico'], action.payload.val()['nombres'], action.payload.val()['nroColegiatura']);
          this.listaPersonal.push(valor)
        })
      } else if(this.selectedValue == 'Paramedicos') {
        actions.forEach(action => {
          const valor = new ListaPersonal(action.payload.val()['idParamedico'], action.payload.val()['nombres'], action.payload.val()['nroDocumento']);
          this.listaPersonal.push(valor)
        })
      } else if(this.selectedValue == 'Pilotos') {
        actions.forEach(action => {
          const valor = new ListaPersonal(action.payload.val()['IdPiloto'], action.payload.val()['Nombres'], action.payload.val()['NroDocumento']);
          this.listaPersonal.push(valor)
          
        })
      } 

      this.basePersonal = this.listaPersonal;

      
      

    })  
    
  }

}
