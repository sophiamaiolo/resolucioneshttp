import { Component, OnInit, Input } from '@angular/core';
import { Resolucion } from '../listado-resoluciones/Resolucion';
import {ServiciosResolucionService} from '../servicios-resolucion.service';

@Component({
  selector: 'app-detalle-resolucion',
  templateUrl: './detalle-resolucion.component.html',
  styleUrls: ['./detalle-resolucion.component.css']
})

export class DetalleResolucionComponent implements OnInit {

  @Input() resolucion : Resolucion;

  constructor(private serviciosResoluciones: ServiciosResolucionService) { console.log('out') }

  ngOnInit() {
    console.log('pepepe')
  
  }
  onClickDocumento(tema:string,autor:string,tipo:string,autortipo:string){
    this.serviciosResoluciones.insertDocumentoResolucion(this.resolucion.uri,tema,tipo,autor,autortipo).subscribe(
      data => {        
      },
      err => {
        console.log(err);
      }
    )    
  }

  onClickAccion(descripcion:string,involucrado:string){
    this.serviciosResoluciones.insertAccionResolucion(this.resolucion.uri,descripcion,involucrado).subscribe(
      data => {        
      },
      err => {
        console.log(err);
      }
    )  
  }

}
