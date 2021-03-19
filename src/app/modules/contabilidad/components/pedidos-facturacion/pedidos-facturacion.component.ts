import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pedidos-facturacion',
  templateUrl: './pedidos-facturacion.component.html',
  styleUrls: ['./pedidos-facturacion.component.css']
})
export class PedidosFacturacionComponent implements OnInit {

  public itemsPedidosCurso: any;

  closeResult: string;
  estado: string  = "Si";

  constructor(private firestore: AngularFirestore, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.firestore.collection('pedidosFacturacion').valueChanges()
    .subscribe(val => {
      this.itemsPedidosCurso = val;
      console.log(this.itemsPedidosCurso);
    });
  }

  open(content, keyPedido: string) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

      console.log(keyPedido);
      

      this.firestore.collection('pedidosFacturacion').doc(keyPedido).update({pagoFinalizado: this.estado});

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

  getClassEstadoVentas(prioridad: any, estado: string): string {
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
