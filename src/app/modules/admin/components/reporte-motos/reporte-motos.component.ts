import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UnidadesMotos } from 'src/app/core/models/unidadesMotos';

@Component({
  selector: 'app-reporte-motos',
  templateUrl: './reporte-motos.component.html',
  styleUrls: ['./reporte-motos.component.css']
})
export class ReporteMotosComponent implements OnInit {

  public unidades: UnidadesMotos[] = [];
  itemsRef: AngularFireList<any>;
  items: any;

  miFormulario: FormGroup

  
  constructor(db: AngularFireDatabase, private _builder: FormBuilder, private firestore: AngularFirestore) {

    this.items = db.list('SuizaMoto/UnidadesActuales').snapshotChanges().subscribe(values => {
      values.forEach(value => {

        const itemsUnidades = new UnidadesMotos(value['key'])
        this.unidades.push(itemsUnidades)
        
      })
    });

    this.miFormulario = this._builder.group({
      vehiculo: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required]
    })
    
    
    
  }

  ngOnInit(): void {
  }

  enviar(values) {
    console.log(values);

/*     this.firestore.collection('SuizaMoto', ref => ref
      .where('timestamp', '>=', values['fechaInicio'])
      .where('timestamp', '<=', values['fechaInicio'])
    ).valueChanges().subscribe(values => {
      console.log(values);
      
    }) */

    let start = new Date(values['fechaInicio']);
    let end = new Date('2018-01-01');

    console.log(end);
    

    this.firestore.collection('SuizaMoto', ref => ref
      .orderBy('timestamp')
    ).valueChanges().subscribe(values => {
      console.log(values);
      
    })

    
    
  }

  onChange(deviceValue) {
    console.log(deviceValue);
  }

}
