import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { pipe } from 'rxjs';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-pedidos-curso',
  templateUrl: './pedidos-curso.component.html',
  styleUrls: ['./pedidos-curso.component.css']
})
export class PedidosCursoComponent implements OnInit {

  public valoresPedidos: any;

  closeResult: string;
  estado: string  = "Preparación Completada";
  comentario: string = "";


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

  open(content, numberItem: string, keyPedido: string) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(keyPedido);
      
      this.firestore.collection('pedidosCurso').doc(keyPedido).valueChanges().pipe(take(1)).subscribe( val => {
        val['pedidos'][numberItem]['comentarioAlmacen'] = this.comentario;
        val['pedidos'][numberItem]['estadoAlmacen'] = this.estado;

        this.firestore.collection('pedidosCurso').doc(keyPedido).update({pedidos:val['pedidos']})
        
      })
      /* this.firestore.collection('pedidosCurso').doc(keyPedido).update({comentarioAlmacen: this.comentario,
                                                                       estadoAlmacen: this.estado});  */
    });
  }

  getClassPrioridad(prioridad: any, estado: string): string {
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

}
