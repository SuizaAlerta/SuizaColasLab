export class ListaUnidades {
    public unidad:string;
    public nombreMedico:string;
    public nombreParamedico:string;
    public nombrePiloto:string;
    public lat:Number;
    public lon:Number;
    public ultimoEnvio:string;
    public atencion:string;
    public icon:string;
    public key:string;

    constructor(unidad, nombreMedico, nombreParamedico, nombrePiloto, lat, lon, ultimoEnvio, atencion, icon){
        this.unidad = unidad;
        this.nombreMedico = nombreMedico;
        this.nombreParamedico = nombreParamedico;
        this.nombrePiloto = nombrePiloto;
        this.lat = lat;
        this.lon = lon;
        this.ultimoEnvio = ultimoEnvio
        this.atencion = atencion;
        this.icon = icon;
    }
}