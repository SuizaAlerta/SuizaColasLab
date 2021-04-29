export class RevisionTecnica {
    
    public vehiculo:string;
    public placa:string;
    public fecharvt:string;
    public diasFaltantes:number;
    
    constructor(vehiculo, placa, fecharvt, diasFaltantes){
        this.vehiculo = vehiculo;
        this.placa = placa;
        this.fecharvt = fecharvt;
        this.diasFaltantes = diasFaltantes;
    }
}