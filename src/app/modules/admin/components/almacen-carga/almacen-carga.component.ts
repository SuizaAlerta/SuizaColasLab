import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-almacen-carga',
  templateUrl: './almacen-carga.component.html',
  styleUrls: ['./almacen-carga.component.css']
})
export class AlmacenCargaComponent implements OnInit {
  public itemsPedidosCurso: any;

  closeResult: string;
  estado: string  = "Preparado Completo";
  comentario: string;


  constructor(private firestore: AngularFirestore, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.firestore.collection('pedidosCurso').valueChanges()
    .subscribe(val => {
      this.itemsPedidosCurso = val;
      console.log(this.itemsPedidosCurso);
    });
  }

  open(content, keyPedido: string) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

      this.firestore.collection('pedidosCurso').doc(keyPedido).update({comentario: this.comentario,
                                                                      estadoPedido: this.estado});
      
      
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

}
