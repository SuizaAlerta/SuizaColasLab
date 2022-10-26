import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { count } from 'console';

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip
} from "ng-apexcharts";
import { element } from 'protractor';

export type figura1 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  formularioInicial: FormGroup;
  mydate: string;
  listaAtenciones: any;
  listaMotorizados: any[] = [];
  cantidadAtencionesMotorizado: any[] = [];

  cantidadAtenciones: number = 0;
  cantidadFinalizados: number = 0;
  cantidadPendientes: number = 0;
  cantidadAnulados: number = 0;

  @ViewChild("figura1") chart: ChartComponent;
  public chartOptions: Partial<figura1>;

  constructor(private firestore: AngularFirestore, private _builder: FormBuilder,) {
    const today = new Date();
    this.mydate = formatDate(today, 'yyyy-MM-dd', 'en-US');

    this.formularioInicial = this._builder.group({
      DESDE: [this.mydate, Validators.required],
      HASTA: [this.mydate, Validators.required],
    });

    

  }

  ngOnInit(): void {
    this.chartOptions = {
      series: [],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: []
      },
      yaxis: {
        title: {
          text: "Cantidad de Atenciones"
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return val + " atenciones";
          }
        }
      }
    };
  }

  async cargarAtenciones(values) {
    let start = new Date(values.DESDE + " 00:00:00");
    let end = new Date(values.HASTA+ " 00:00:00");
    end.setDate(end.getDate()+1)

    await this.firestore.collection('AtencionesCurso', ref => ref.where('timestamp','>',start).where('timestamp','<',end)).valueChanges().subscribe(async val => {

      this.listaMotorizados = [];
      this.cantidadAtencionesMotorizado = [];
      this.cantidadAtenciones = 0;
      this.cantidadFinalizados = 0;
      this.cantidadPendientes = 0;
      this.cantidadAnulados = 0; 
      this.cantidadAtenciones = val.length
      this.listaAtenciones = val;

      val.forEach(atencion => {
        if(atencion['estado'] == 'Finalizado') {
          this.cantidadFinalizados = this.cantidadFinalizados + 1;
        } else if(atencion['estado'] == 'Activo' || atencion['estado'] == 'En Curso' || atencion['estado'] == 'Llegada al Destino') {
          this.cantidadPendientes = this.cantidadPendientes + 1;
        } else if(atencion['estado'] == 'Anulado') {
          this.cantidadAnulados = this.cantidadAnulados + 1;
        }
      })

      const valores = this.listaAtenciones.filter(val =>{
        return val['estado'] == "Finalizado";
      })

      valores.forEach(atencion => {
        this.listaMotorizados.push(atencion['motorizado'])
      })

      var uniqueArr = [...new Set(this.listaMotorizados)]
      uniqueArr.sort()

      const countMotorizado = {};

      this.listaMotorizados.forEach(element => {
        countMotorizado[element] = (countMotorizado[element] || 0) + 1;
      });

       

      await uniqueArr.forEach(val => {
        this.cantidadAtencionesMotorizado.push(countMotorizado[val])
      })

     /*  const dataArr = new Set(this.listaMotorizados);
      let result = [...dataArr];
      result.sort(); */
      
      
      this.chartOptions = {
        series: [
          {
            name: "Net Profit",
            data: this.cantidadAtencionesMotorizado
          }
        ],
        chart: {
          type: "bar",
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%"
          }
        },
        dataLabels: {
          enabled: true
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"]
        },
        xaxis: {
          categories: uniqueArr
        },
        yaxis: {
          title: {
            text: "Cantidad de Atenciones"
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return val + " atenciones";
            }
          }
        }
      };

    })

    
    

    
  }

}
