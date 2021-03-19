export class ListaPedidosPrueba {
 
    public pedido:string;
    public unidad:string;
    public cantidad:number;
    public observacion:string;
    public modalidadPago:string;
    public pagoFinalizado:boolean;
    public estadoPedido:string;
    public solicitante:string;
    public comentario:string;
    public key:string;

    constructor(pedido, unidad, cantidad, observacion, modalidadPago, pagoFinalizado, estadoPedido, solicitante, comentario){

        this.pedido = pedido;
        this.unidad = unidad;
        this.cantidad = cantidad;
        this.observacion = observacion;
        this.modalidadPago = modalidadPago;
        this.pagoFinalizado = pagoFinalizado;
        this.estadoPedido = estadoPedido;
        this.solicitante = solicitante;
        this.comentario = comentario;

    }
}