import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ListaPedidos } from 'src/app/core/models/listaPedidos';
import { User } from 'src/app/core/models/user.model';
import * as uuid from 'uuid';
import { firestore } from 'firebase/app';


@Component({
  selector: 'app-cargar-pedidos',
  templateUrl: './cargar-pedidos.component.html',
  styleUrls: ['./cargar-pedidos.component.css']
})
export class CargarPedidosComponent implements OnInit {

  miFormulario: FormGroup;

  listaPedidos: any;
  habilitarEstadoPago: string;
  public itemsPedidosCurso: ListaPedidos[] = [];
  public itemsPedidosCursoPrueba: any = [];
  public nombreSolicitante: string;

  public cliente: string;
  public modalidad: string = "crédito";
  public pago: string;
  public prioridad: boolean = false;
  public pagoFinalizado: string = "No";


  todayDate : Date = new Date();

  dia : number;
  mes : number;
  año : number;

  hora : number;
  minuto : number;
  segundo : number;

  fecha: string;
  horario: string;

  constructor(private _builder : FormBuilder, private firestore: AngularFirestore, private _route: ActivatedRoute) {
    this.miFormulario = this._builder.group({
      cliente : ['', Validators.required],
      pedido : ['', Validators.required],
      cantidad : ['', Validators.required],
      observacion : ['', Validators.required],
      unidad : ['Kg', Validators.required]
    })

    this._route.data.subscribe((data: { user: User }) => {
      this.nombreSolicitante = data.user['nombre'];
    }, err => { console.log("Error hub:", err) });
  }

  ngOnInit(): void {
    this.dia = this.todayDate.getDate();
    this.mes = this.todayDate.getMonth() + 1;
    this.año = this.todayDate.getFullYear();

    this.hora = this.todayDate.getHours();
    this.minuto = this.todayDate.getMinutes();
    this.segundo = this.todayDate.getSeconds();

    console.log(this.hora + ":" + this.minuto + ":" + this.segundo);
    this.horario = this.hora + ":" + this.minuto + ":" + this.segundo;

    if(this.mes.toString.length == 1) {
      this.fecha = this.dia + "-" + "0" + this.mes + "-" + this.año;
      console.log(this.fecha);
    } else {
      this.fecha = this.dia + "-" + this.mes + "-" + this.año;
      console.log(this.fecha);
    }
  }

  enviar(values) {
    const myId = uuid.v4();

    this.cliente = values['cliente'];
    this.pago = values['pagoFinalizado'];
    
    const dataPedidos = new ListaPedidos(this.horario+this.fecha+myId,values['cliente'],values['pedido'],values['unidad'],values['cantidad'],values['observacion'],values['prioridad'], values['pagoFinalizado'],this.fecha, this.horario,"No preparado",this.nombreSolicitante,"")

    const data = {pedido:values['pedido'], cantidad:values['cantidad'], unidad:values['unidad'], observacion:values['observacion'], estadoAlmacen: "No preparado", comentarioAlmacen:"", estadoOficina: "No entregado", comentarioOficina:""}
    this.itemsPedidosCursoPrueba.push(data)
    
    this.itemsPedidosCurso.push(dataPedidos)
}

  modalidadPago(e) {
    this.habilitarEstadoPago = e.target.value;
  }

  eliminarPedido(e): void {
    console.log(e.target.value);

    this.itemsPedidosCurso.forEach((element,index) => {

      if (element['pedido'] == e.target.value) {
        this.itemsPedidosCurso.splice(index, 1);
        
      }
      
    })

    this.itemsPedidosCursoPrueba.forEach((element,index) => {

      if (element['pedido'] == e.target.value) {
        this.itemsPedidosCursoPrueba.splice(index, 1);
        
      }
      
    })

    /* this.itemsPedidosCurso.splice(index, 1); */
    
   
  }

  cargarPedido() {
    var today = new Date();
    const myId = uuid.v4();

    this.firestore.collection('pedidosCurso').doc(myId).set({
      cliente: this.cliente,
      solicitante: this.nombreSolicitante,
      pagoFinalizado: this.pagoFinalizado,
      modalidad: this.modalidad,
      fecha: this.fecha,
      hora: this.horario,
      timestamp: firestore.Timestamp.fromDate(today),
      pedidos: this.itemsPedidosCursoPrueba,
      prioridad: this.prioridad,
      uid: myId
    })
    this.itemsPedidosCursoPrueba= [];
    this.itemsPedidosCurso = [];
    /* this.itemsPedidosCurso.forEach( value => {
      this.firestore.collection("pedidosCurso").doc(value['key']).set({ key:value['key'],
                                                                        cliente: value['cliente'],
                                                                        pedido: value['pedido'],
                                                                        unidad: value['unidad'],
                                                                        cantidad: value['cantidad'],
                                                                        observacion: value['observacion'],
                                                                        prioridad: value['prioridad'],
                                                                        modalidadPago: value['modalidadPago'],
                                                                        pagoFinalizado: value['pagoFinalizado'],
                                                                        estadoPedido: value['estadoPedido'],
                                                                        fechaCarga: value['fechaCarga'],
                                                                        horario: value['horario'],
                                                                        nombreSolicitante: value['solicitante'],
                                                                        comentario:""});
      console.log(value);
      this.itemsPedidosCurso = [];
      
    })  */ 
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
