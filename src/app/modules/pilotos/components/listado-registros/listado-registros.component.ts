import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-listado-registros',
  templateUrl: './listado-registros.component.html',
  styleUrls: ['./listado-registros.component.css']
})
export class ListadoRegistrosComponent implements OnInit {

  public nombrePiloto: string;

  public itemsReportes: any;
  public reporte : any;
  closeResult: string;

  public title: string = "Reporte del Piloto";
  opcion: number = 1;

  constructor(private firestore: AngularFirestore, private modalService: NgbModal, private _route: ActivatedRoute) {
    let today = new Date();
    let startDate = new Date(today);

    this._route.data.subscribe((data: { user: User }) => {
      this.nombrePiloto = data.user['nombre'];
      
    }, err => { console.log("Error hub:", err) });

    this.firestore.collection<any>('listaReportePiloto',ref => ref.where("nombrePiloto", '==', this.nombrePiloto)).valueChanges().subscribe(val => {
      this.reporte = val;
      let newarr = val.sort((a, b) => b.timestamp - a.timestamp);
      console.log(newarr);
    });

  }

  ngOnInit(): void {
  }

  itemsMenu(valor){
    this.opcion = valor;

    switch(valor) {
      case '1': {
        this.title = "Reporte del Piloto";
        break;
      }

      case '2': {
        this.title = "Inspección Diaria";
        break;
      }

      case '3': {
        this.title = "Evaluación UME";
        break;
      }

      case '4': {
        this.title = "Inspección Externa";
        break;
      }
        
    }
  }

  open(content,key:string) {

    this.itemsReportes = [];
    this.firestore.collection('listaReportePiloto').doc(key).valueChanges()
    .subscribe(val => {
      this.itemsReportes = val;
    })
    
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
