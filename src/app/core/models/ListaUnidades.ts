export class ListaUnidades {
    public unidad:string;
    public nombreMedico:string;
    public nombreParamedico:string;
    public nombrePiloto:string;
    public lat:Number;
    public lon:Number;
    public atencion:string;
    public icon:string;
    public key:string;

    constructor(unidad, nombreMedico, nombreParamedico, nombrePiloto, lat, lon, atencion, icon){
        this.unidad = unidad;
        this.nombreMedico = nombreMedico;
        this.nombreParamedico = nombreParamedico;
        this.nombrePiloto = nombrePiloto;
        this.lat = lat;
        this.lon = lon;
        this.atencion = atencion;
        this.icon = icon;
    }
}