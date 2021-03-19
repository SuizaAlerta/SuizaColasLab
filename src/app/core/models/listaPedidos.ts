export class ListaPedidos {
    public cliente:string;
    public pedido:string;
    public unidad:string;
    public cantidad:number;
    public observacion:string;
    public prioridad:boolean;
    public pagoFinalizado:boolean;
    public fechaCarga:string;
    public horario:string;
    public estadoPedido:string;
    public solicitante:string;
    public comentario:string;
    public key:string;

    constructor(key, cliente, pedido, unidad, cantidad, observacion, prioridad, pagoFinalizado, fechaCarga, horario, estadoPedido, solicitante, comentario){
        this.key = key;
        this.cliente = cliente;
        this.pedido = pedido;
        this.unidad = unidad;
        this.cantidad = cantidad;
        this.observacion = observacion;
        this.prioridad = prioridad;
        this.pagoFinalizado = pagoFinalizado;
        this.fechaCarga = fechaCarga;
        this.horario = horario;
        this.estadoPedido = estadoPedido;
        this.solicitante = solicitante;
        this.comentario = comentario;

    }
}