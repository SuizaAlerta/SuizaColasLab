import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-ficha-sintomatologia',
  templateUrl: './ficha-sintomatologia.component.html',
  styleUrls: ['./ficha-sintomatologia.component.css']
})
export class FichaSintomatologiaComponent implements OnInit {

  totalAngularPackages;

  constructor(private https: HttpClient) { }

  ngOnInit(): void {
    this.https.get<any>('/api/login/app_listarparamedico').subscribe(data => {
            console.log(data  );
        })
  }
}
