import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-historial-pedidos',
  templateUrl: './historial-pedidos.component.html',
  styleUrls: ['./historial-pedidos.component.css']
})
export class HistorialPedidosComponent implements OnInit {

  public itemsPedidosCurso: any;

  constructor(private firestore: AngularFirestore, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.firestore.collection('pedidosHistorial').valueChanges()
    .subscribe(val => {
      this.itemsPedidosCurso = val;
    });
  }

}
