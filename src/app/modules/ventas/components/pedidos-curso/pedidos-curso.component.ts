import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pedidos-curso',
  templateUrl: './pedidos-curso.component.html',
  styleUrls: ['./pedidos-curso.component.css']
})
export class PedidosCursoComponent implements OnInit {

  public itemsPedidosCurso: any;
  public listaValores: any;

  closeResult: string;
  estado: string  = "Entrega Completa";
  comentario: string;

  public cadena : any = [];
  valoresPedidos : any = []; 

  pruebaLista : any = [];

  constructor(private firestore: AngularFirestore, private modalService: NgbModal) {
    let today = new Date();
    let startDate = new Date(today);

    this.firestore.collection<any>('pedidosCurso',ref => ref.where("timestamp", '<=', startDate).orderBy("timestamp", 'desc')).valueChanges().subscribe(val => {
      this.valoresPedidos = val;
      console.log(val);
    });;
  }

  ngOnInit(): void {
  }

  open(content, key:string) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(key);
      console.log(this.estado);
      console.log(this.comentario);
      this.firestore.collection('pedidosCurso').doc(key).update({estadoOficina: this.estado, comentarioOficina: this.comentario});
      
    });
  }

  getClassPrioridad(valor: any): string {
    if (valor != undefined && valor != '-') {

      if(valor){
        return 'rango-rojo';
      }
    } else {
      return 'sin-valor';
    }
  }

  getClassEstadoAlmacen(prioridad: any, estado: string): string {
    if (prioridad != undefined && prioridad != '-') {

      if(prioridad){
        if(estado == "Preparación Completada"){
          return 'preparado-completo rango-rojo';
        } else if (estado == "Preparación Parcial"){
          return 'preparado-parcial rango-rojo';
        } else {
          return 'rango-rojo';
        }
      } else{
        if(estado == "Preparación Completada"){
          return 'preparado-completo';
        } else if (estado == "Preparación Parcial"){
          return 'preparado-parcial';
        }
      }
    } else {
      return 'sin-valor';
    }
  }

  getClassEstado(prioridad: any, estado: string): string {
    if (prioridad != undefined && prioridad != '-') {

      if(prioridad){
        if(estado == "Entrega Completa"){
          return 'preparado-completo rango-rojo';
        } else if (estado == "Entrega Parcial"){
          return 'preparado-parcial rango-rojo';
        } else {
          return 'rango-rojo';
        }
      } else{
        if(estado == "Entrega Completa"){
          return 'preparado-completo';
        } else if (estado == "Entrega Parcial"){
          return 'preparado-parcial';
        }
      }
    } else {
      return 'sin-valor';
    }
  }

}
