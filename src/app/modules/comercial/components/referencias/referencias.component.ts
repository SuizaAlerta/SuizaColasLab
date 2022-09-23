import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-referencias',
  templateUrl: './referencias.component.html',
  styleUrls: ['./referencias.component.css']
})
export class ReferenciasComponent implements OnInit {

  itemsRef: AngularFireList<any>;

  formularioAgregarReferencia: FormGroup;
  formularioEditarReferencia: FormGroup;

  @ViewChild('closebutton') closebutton;
  @ViewChild('closebuttonEditar') closebuttonEditar;

  displayedColumns = ['numeroReferencia', 'nombreCompania', 'razonSocial', 'ruc', 'departamento', 'provincia', 'distrito', 'distritoRecojo', 'direccion', 'direccionRecojo', 'nomprom', 'numprom', 'telefono', 'c_emacia', 'formaPago', 'acciones'];

  dataSource: MatTableDataSource<PuestoData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public db: AngularFireDatabase, private _builder: FormBuilder, private _route: ActivatedRoute) {

    this.formularioAgregarReferencia = this._builder.group({
      numeroReferencia: ['', Validators.required],
      nombreCompania: ['',Validators.required],
      razonSocial: ['',Validators.required],
      ruc: ['',Validators.required],
      departamento: ['',Validators.required],
      provincia: ['',Validators.required],
      distrito: ['',Validators.required],
      distritoRecojo: ['',Validators.required],
      direccion: ['',Validators.required],
      direccionRecojo: ['',Validators.required],
      celular: ['',Validators.required],
      email: ['',Validators.required],
      formaPago: ['',Validators.required],
      nombrePromotor: ['',Validators.required],
      emailPromotor: ['',Validators.required],
      fechaInscripcion: [''],
    });

    this.formularioEditarReferencia = this._builder.group({
      numeroReferencia: ['', Validators.required],
      nombreCompania: ['',Validators.required],
      razonSocial: ['',Validators.required],
      ruc: ['',Validators.required],
      departamento: ['',Validators.required],
      provincia: ['',Validators.required],
      distrito: ['',Validators.required],
      distritoRecojo: ['',Validators.required],
      direccion: ['',Validators.required],
      direccionRecojo: ['',Validators.required],
      celular: ['',Validators.required],
      email: ['',Validators.required],
      formaPago: ['',Validators.required],
      nombrePromotor: [''],
      emailPromotor: [''],
      fechaInscripcion: [''],
    });

    this._route.data.subscribe((data: {user: User}) => {
      const user = data.user['nombre']
      const email = data.user['email']

      this.formularioAgregarReferencia.patchValue({nombrePromotor:user, emailPromotor: email})
            
    })

    this.itemsRef = db.list('SuizaMotoUbicaciones/CodReferencia'); 

    this.itemsRef.valueChanges().subscribe(async valores => {
      this.dataSource = new MatTableDataSource(valores);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

  }

  ngOnInit(): void {
  }

  agregarReferencia (values) {

    values.fechaInscripcion = formatDate(new Date(),'yyyy-MM-dd HH:mm:ss','en-US')

    this.db.object('SuizaMotoUbicaciones/CodReferencia/'+values['numeroReferencia']).set(values).then(() => {
      this.closebutton.nativeElement.click();
      this.formularioAgregarReferencia.reset();

      Swal.fire(
        'Carga Exitosa!',
        'Se registró correctamente el número de referencia ' + values.numeroReferencia,
        'success'
      )

    });
  }

  editarReferencia (values) {

    console.log(values);
    
    this.db.object('SuizaMotoUbicaciones/CodReferencia/'+values['numeroReferencia']).update(values).then(() => {
      this.closebuttonEditar.nativeElement.click();
      this.formularioEditarReferencia.reset();

      Swal.fire(
        'Actualización Exitosa!',
        'Se actualizó correctamente el número de referencia ' + values.numeroReferencia,
        'success'
      )

    });
  }

  editarNumeroReferencia (values) {
    this.db.object('SuizaMotoUbicaciones/CodReferencia/'+values).valueChanges().subscribe(val => {
      this.formularioEditarReferencia.patchValue(val)
    })
  }

  eliminarNumeroReferencia (values) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    })

    swalWithBootstrapButtons.fire({
      title: 'Estas seguro?',
      text: "Deseas eliminar el registro!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: false,
      confirmButtonColor: 'Crimson',
      cancelButtonColor: 'LightSeaGreen',
    }).then((result) => {
      if (result.isConfirmed) {

        this.db.object('SuizaMotoUbicaciones/CodReferencia/'+values).remove().then(() => {
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'El registro fue eliminado',
            'success'
          )
        })

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'No se eliminó ningun registro',
          'error'
        )
      }
    })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  mouseOverIndex = -1;

  public onMouseOver(index) {
    // console.log(index)
    this.mouseOverIndex = index;
  }

}

export interface PuestoData {
  numeroReferencia: string;
  nombreCompania: string;
  razonSocial: string;
  ruc: string;
  departamento: string;
  provincia: string;
  distrito: string;
  distritoRecojo: string;
  direccion: string;
  direccionRecojo: string;
  nomprom: string;
  numprom: string;
  telefono: string;
  c_emacia: string;
  formaPago: string;
}