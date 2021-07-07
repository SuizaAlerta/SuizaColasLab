import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-lista-registro',
  templateUrl: './lista-registro.component.html',
  styleUrls: ['./lista-registro.component.css']
})
export class ListaRegistroComponent implements OnInit {

  public itemsReportes: any;
  public reporte : any;
  closeResult: string;

  public title: string = "Reporte del Piloto";
  opcion: number = 1;

  public fechaFiltro: any; 

  constructor(private firestore: AngularFirestore, private modalService: NgbModal) {
    let today = new Date();
    let startDate = new Date(today);

    this.firestore.collection<any>('listaReportePiloto',ref => ref.where("timestamp", '<=', startDate).orderBy("timestamp", 'desc')).valueChanges().subscribe(val => {
      this.reporte = val;
      console.log(val);
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

  changedDate(value){
    console.log(value);
  }

}
