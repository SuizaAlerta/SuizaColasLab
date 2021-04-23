import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reporte-carga-exitosa',
  templateUrl: './reporte-carga-exitosa.component.html',
  styleUrls: ['./reporte-carga-exitosa.component.css']
})
export class ReporteCargaExitosaComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  Inicio() {
    this.router.navigate(['/gerencia/reporte-pilotos']);
  }

}
