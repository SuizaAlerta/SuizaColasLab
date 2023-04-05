import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  formularioInicial: FormGroup;

  habilitadorTipoServicios: boolean = true;
  nombreTipoServicio: string = "";
  tipoDocumento: string = "DNI";

  bodyToken: any = {};
  token: string = "";
  refreshToken: string = "";

  valorDocumento = "";

  constructor(private _builder: FormBuilder, private http: HttpClient,) {
    this.formularioInicial = this._builder.group({
      TIPODOCUMENTO: [this.tipoDocumento, Validators.required],
      NRODOCUMENTO: ["", Validators.required],
      TIPOSERVICIO: ["", Validators.required],
    });

   this.bodyToken = { "email": "edenegri@suizaalerta.com", "password": "123456", "sede": "Miraflores", "idSede": "01" };
   this.http.post<any>("https://api.suiza-soft.com/token", this.bodyToken).subscribe(val => {

    
    console.log(val.data);
    
   })
    
  }

  ngOnInit(): void {
  }

  seleccionarTipoServicio(value) {
    console.log(value);
    this.habilitadorTipoServicios = false
    this.nombreTipoServicio = value
    this.formularioInicial.patchValue({TIPOSERVICIO: this.nombreTipoServicio})
    this.formularioInicial.patchValue({TIPODOCUMENTO: "DNI"})
  }

  selectDocumento(value) {
    this.tipoDocumento = value
    this.formularioInicial.patchValue({TIPODOCUMENTO: this.tipoDocumento})
  }

  tecladoNumero(value) {
    this.valorDocumento = this.valorDocumento + value
    this.formularioInicial.patchValue({NRODOCUMENTO: this.valorDocumento})
  }

  backpress() {
    this.valorDocumento = this.valorDocumento.slice(0,-1)
    this.formularioInicial.patchValue({NRODOCUMENTO: this.valorDocumento})
  }

  cancelar() {
    this.habilitadorTipoServicios = true;
    this.valorDocumento = "";
    this.formularioInicial.reset()
  }

  cargar(value) {

    console.log(value);
    
    
    
    this.http.post<any>("https://api.suiza-soft.com/token", this.bodyToken).subscribe(val => {
      const headersPaciente = {'Authorization':'Bearer ' + val.data.token}
      this.http.get<any>("https://api.suiza-soft.com/patient/" + value.NRODOCUMENTO , {headers: headersPaciente}).subscribe(paciente => {
        console.log(paciente.data);
      }).add(() => {
        Swal.fire(
          'Carga Exitosa!',
          'Imprimiendo ticket!',
          'success'
        )
      })
    })

    
    this.valorDocumento = "";
    this.habilitadorTipoServicios = true
    this.formularioInicial.reset()
    
  }

}