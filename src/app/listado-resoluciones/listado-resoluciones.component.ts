import { Component, OnInit, Input } from '@angular/core';
import {ServiciosResolucionService} from '../servicios-resolucion.service';
import { Repartido} from '../listado-repartidos/repartido';
import { Resolucion } from './Resolucion';

@Component({
  selector: 'app-listado-resoluciones',
  templateUrl: './listado-resoluciones.component.html',
  styleUrls: ['./listado-resoluciones.component.css']
})
export class ListadoResolucionesComponent implements OnInit {

  @Input() shortUriRepartido: string;
  @Input() resoluciones: any;
  @Input() repartido : Repartido;
  
  selectedResolucion: Resolucion;
  

  constructor(private serviciosResoluciones: ServiciosResolucionService) { }

  onClickResolucion(rep:any){
    
    console.log('rep'+rep.n.value);   
    this.selectedResolucion=new Resolucion(rep.n.value);
    this.selectedResolucion.texto="Visto la solicitud del CENUR Litoral Norte - sede Paysandú, y el informe de disponibilidad realizado por el Dpto. de Contaduría RN."
  }

  ngOnInit() {
    
  }

}
