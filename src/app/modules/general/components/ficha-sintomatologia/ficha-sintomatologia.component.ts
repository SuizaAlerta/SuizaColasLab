import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { interpolateGreens } from 'd3';

@Component({
  selector: 'app-ficha-sintomatologia',
  templateUrl: './ficha-sintomatologia.component.html',
  styleUrls: ['./ficha-sintomatologia.component.css']
})
export class FichaSintomatologiaComponent implements OnInit {

  valoresAreaTrabajo = [];
  valoresPuestoTrabajo = [];
  valoresTipoDocumento = [];
  valoresEmpleados = [];

  numeroDocumento: "";
  habilitadorDetalles:boolean = false;

  itemsAreaTrabajo: AngularFireList<any>;
  itemsPuestoTrabajo: AngularFireList<any>;
  itemsTipoDocumento: AngularFireList<any>;
  itemsEmpleados: AngularFireList<any>;

  miFormulario: FormGroup

  itemEnvio: AngularFireObject<any>;

  constructor(db: AngularFireDatabase, private _builder: FormBuilder, private router: Router,) {

    this.itemEnvio = db.object('Proyectos/fichaSintomatologica');

    this.miFormulario = this._builder.group({
      nroDocumento: ['', Validators.required],
      nombreCompleto: ['', Validators.required],
      idEmpleado: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      nroTelefono: ['', Validators.required],
      areaTrabajo: ['', Validators.required],
      puestoTrabajo: ['', Validators.required],
      direccion: ['', Validators.required],
      idSintoma1: ['', Validators.required],
      idSintoma2: ['', Validators.required],
      idSintoma3: ['', Validators.required],
      idSintoma4: ['', Validators.required],
      idSintoma5: ['', Validators.required],
      idSintoma6: ['', Validators.required],
      detalles:['']
      

      
    })

    this.itemsAreaTrabajo = db.list('Proyectos/MAE_AREA_TRABAJO');
    this.itemsAreaTrabajo.snapshotChanges(['child_added'])
    .subscribe(actions => {
      actions.forEach(action => {
        this.valoresAreaTrabajo.push(action.payload.val())
      });
    });

    this.itemsPuestoTrabajo = db.list('Proyectos/MAE_PUESTO_TRABAJO');
    this.itemsPuestoTrabajo.snapshotChanges(['child_added'])
    .subscribe(actions => {
      actions.forEach(action => {
        this.valoresPuestoTrabajo.push(action.payload.val())
      });
    });

    this.itemsTipoDocumento = db.list('Proyectos/MAE_TIPO_DOCUMENTOS');
    this.itemsTipoDocumento.snapshotChanges(['child_added'])
    .subscribe(actions => {
      actions.forEach(action => {
        this.valoresTipoDocumento.push(action.payload.val())
      });
    });

    this.itemsEmpleados = db.list('Proyectos/MAE_EMPLEADOS');
    this.itemsEmpleados.snapshotChanges(['child_added'])
    .subscribe(actions => {
      actions.forEach(action => {
        this.valoresEmpleados.push(action.payload.val())
      });
    });

  }

  ngOnInit(): void {}

  

  Cargar() {

    //console.log(this.numeroDocumento);

    this.valoresEmpleados.forEach(val => {
      if(parseInt(val.NroDocumento) == parseInt(this.numeroDocumento)) {
        this.miFormulario.patchValue({nombreCompleto: val.NombreCompleto})
        this.miFormulario.patchValue({idEmpleado: val.IdEmpleado})
        this.miFormulario.patchValue({tipoDocumento: val.TipoDocumento})
        this.miFormulario.patchValue({nroTelefono: val.Telefono})
        this.miFormulario.patchValue({areaTrabajo: val.AreaTrabajo})
        this.miFormulario.patchValue({puestoTrabajo: val.PuestoTrabajo})
        this.miFormulario.patchValue({direccion: val.Direccion})

        
      }
    })
  }

  enviar(value){

    let date_ob = new Date()

    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = date_ob.getHours();

    // current minutes
    let minutes = date_ob.getMinutes();

    // current seconds
    let seconds = date_ob.getSeconds();

    // prints date & time in YYYY-MM-DD HH:MM:SS format
    let fecha = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    console.log(fecha);
    
    

    if(value.detalles == ""){
      value.detalles = "-"
    } 

    this.itemEnvio.update({idEmpleado: value.idEmpleado,
                          tipoDocumento: value.tipoDocumento,
                          nroDocumento: value.nroDocumento,
                          nroTelefono: value.nroTelefono,
                          puestoTrabajo: value.puestoTrabajo,
                          areaTrabajo: value.areaTrabajo,
                          direccion: value.direccion,
                          idSintoma1: value.idSintoma1,
                          idSintoma2: value.idSintoma2,
                          idSintoma3: value.idSintoma3,
                          idSintoma4: value.idSintoma4,
                          idSintoma5: value.idSintoma5,
                          idSintoma6: value.idSintoma6,
                          detalles: value.detalles,
                          fechaCreacion: fecha,
                          })

    this.router.navigate(['/general/carga-exitosa']);
    this.miFormulario.reset();

  }

  onChange(valor) {
    this.numeroDocumento = valor;
  }

  onChangeIdSintoma1(valor) {
    this.miFormulario.patchValue({idSintoma1: valor})
  }

  onChangeIdSintoma2(valor) {
    this.miFormulario.patchValue({idSintoma2: valor})
  }

  onChangeIdSintoma3(valor) {
    this.miFormulario.patchValue({idSintoma3: valor})
  }

  onChangeIdSintoma4(valor) {
    this.miFormulario.patchValue({idSintoma4: valor})
  }

  onChangeIdSintoma5(valor) {
    this.miFormulario.patchValue({idSintoma5: valor})
  }

  onChangeIdSintoma6(valor) {
    if (valor != 0){
      this.habilitadorDetalles = true
    } else {
      this.habilitadorDetalles = false
    }

    this.miFormulario.patchValue({idSintoma6: valor})
  }
}
