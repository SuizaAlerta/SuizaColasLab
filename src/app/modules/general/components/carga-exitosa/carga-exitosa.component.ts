import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carga-exitosa',
  templateUrl: './carga-exitosa.component.html',
  styleUrls: ['./carga-exitosa.component.css']
})
export class CargaExitosaComponent implements OnInit {

  closeResult: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  Inicio() {
    this.router.navigate(['/general']); 
  }

}
