import { Component, OnInit, Input } from '@angular/core';
import {ServiciosResolucionService} from '../servicios-resolucion.service';
import { Repartido} from '../listado-repartidos/repartido';

@Component({
  selector: 'app-listado-resoluciones',
  templateUrl: './listado-resoluciones.component.html',
  styleUrls: ['./listado-resoluciones.component.css']
})
export class ListadoResolucionesComponent implements OnInit {

  @Input() shortUriRepartido: string;
  @Input() resoluciones: any;
  @Input() repartido : Repartido;

  constructor(private serviciosResoluciones: ServiciosResolucionService) { }

  onClickResolucion(rep:any){
    console.log('rep'+rep);
  }

  ngOnInit() {
    
  }

}
