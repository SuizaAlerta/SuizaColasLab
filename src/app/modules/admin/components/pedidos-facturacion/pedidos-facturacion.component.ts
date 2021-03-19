import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-pedidos-facturacion',
  templateUrl: './pedidos-facturacion.component.html',
  styleUrls: ['./pedidos-facturacion.component.css']
})
export class PedidosFacturacionComponent implements OnInit {

  public itemsPedidosCurso: any;
  public listaValores: any;
  public addItem:any = []

  closeResult: string;
  estado: string  = "Entrega Completa";
  comentario: string;

  public cadena : any = [];
  valoresPedidos : any = []; 
  public pedidosEditar : any = [];
  public agregarPedido : any = {};

  pruebaLista : any = [];

  constructor(private firestore: AngularFirestore, private modalService: NgbModal) { 
    this.firestore.collection('pedidosCobranza').valueChanges()
    .subscribe(val => {
      this.valoresPedidos = val;
      console.log(val);
    });
    
  }

  ngOnInit(): void {
    this.firestore.collection('pedidosCobranza').valueChanges()
    .subscribe(val => {
      this.itemsPedidosCurso = val;
    });

    this.agregarPedido = {pedido:"",cantidad:"",observacion:"",unidad:"Kg",estadoAlmacen:"No preparado"}
  }

  open(content, key:string) {
    
    this.pedidosEditar = [];
    this.firestore.collection('pedidosCobranza').doc(key).valueChanges()
    .subscribe(val => {
      this.pedidosEditar.push(val)

      /* console.log(this.pedidosEditar); */
      
      
    });
    
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(key);

    this.firestore.collection('pedidosCobranza').doc(key).update({pedidos:this.pedidosEditar[0]['pedidos'], estadoOficina: this.pedidosEditar[0]['estadoOficina']}) 
      
      
    });
  }

  openAgregar(content, key:string) {
    


    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(key);

    this.firestore.collection('pedidosCobranza').doc(key).valueChanges().pipe(take(1)).subscribe(val => {

      let valor = val['pedidos']
      valor.push(this.agregarPedido)

      this.firestore.collection('pedidosCobranza').doc(key).update({pedidos:valor}) 

    
      console.log(valor)      
    })
      
      
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

  enviarCobranza(valorKey: string) {
    this.firestore.collection('pedidosCurso').doc(valorKey).valueChanges()
    .subscribe(val => {

      this.firestore.collection('pedidosCobranza').doc(val['uid']).set(val);
      this.firestore.collection('pedidosCurso').doc(valorKey).delete();
    });
    
  }

  editarPedidos(model: string, valorItem: string, e) {

    if (model != 'estadoOficina'){
      this.pedidosEditar[0]['pedidos'][valorItem][model] = e.target.value;
    } else {
      this.pedidosEditar[0]['estadoOficina'] = e.target.value;
    }
    
    
    console.log(this.pedidosEditar[0]['pedidos']);
    
  }

  agregarItem(model:string, numberItem: string, e){
    /* this.addItem[model] = e.target.value */
    this.agregarPedido[model] = e.target.value; 
    console.log(this.agregarPedido);
      

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