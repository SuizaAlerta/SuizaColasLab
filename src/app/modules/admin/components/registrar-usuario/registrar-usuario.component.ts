import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { timeThursdays } from 'd3';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {

  @ViewChild('closebutton') closebutton;

  formularioCreacionUsuario: FormGroup;
  formularioEditarUsuario: FormGroup;
  public listaRegistros = [];
  public registroEditar = [];

  constructor( private _builder: FormBuilder, private data: DataService, private db: AngularFireDatabase ) {
    this.formularioCreacionUsuario = this._builder.group({
      password: ['', Validators.required],
      nombre: ['', Validators.required],
      dni: ['',Validators.required],
      placa: ['',Validators.required]
      
    });

    this.formularioEditarUsuario = this._builder.group({
      password: ['', Validators.required],
      nombre: ['', Validators.required],
      dni: ['',Validators.required],
      contraseña: ['',Validators.required],
      placa: ['',Validators.required]
      
    });

    this.db.list('SuizaMoto/Usuarios/').valueChanges().subscribe(val => {
      this.listaRegistros = val;
    })
    
  }

  ngOnInit(): void {
  }

  cargarNuevoUsuario(value) { 
    console.log(value);
    value['contraseña'] = value['password']
    this.db.object('SuizaMoto/Usuarios/'+value['dni']).set(value).then(() => {
      alert("Se registro el usuario correctamente!")
    })
    
  }

  editarUsuario(value) {
    
    value['password'] = value['contraseña']
    this.db.object('SuizaMoto/Usuarios/'+value['dni']).update(value).then(() => {
      alert("Se registro el usuario correctamente!")
      this.closebutton.nativeElement.click();
    })

  }

  Editar(value) {
    this.formularioEditarUsuario.patchValue(value);
    console.log(this.formularioEditarUsuario);
    
  }

  Eliminar(value) {
    console.log(value);
    
    if(confirm("¿Desea Eliminar al Usuario?")) {

      this.db.list('SuizaMoto/UsuariosEliminados').push(value);

      this.db.object('SuizaMoto/Usuarios/'+value.dni).remove().then(() => {
        alert("Se elimino al usuario correctamente!")
      })

    } else {
    }
    
  }

}
