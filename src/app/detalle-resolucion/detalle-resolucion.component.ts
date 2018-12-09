import { Component, OnInit, Input } from '@angular/core';
import { Resolucion } from '../listado-resoluciones/resolucion';
import {ServiciosResolucionService} from '../servicios-resolucion.service';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, tap} from 'rxjs/operators';



const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

  const datatest = [
    {"id": 1, "label": "machin"},
    {"id": 2, "label": "truc"}
];


@Component({
  selector: 'app-detalle-resolucion',
  templateUrl: './detalle-resolucion.component.html',
  styleUrls: ['./detalle-resolucion.component.css']
})


export class DetalleResolucionComponent implements OnInit {

  public model: any;
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      //map(term => this.nombres)
     
      map(term => term.length < 2 ? []
        : this.nombres.filter(item => item.b.value.toLowerCase().includes(term.toLowerCase())))  
    )
    

  formatter = (x: {a: any, b: any}) => x.b.value;

  @Input() resolucion : Resolucion;
  nombres:any;

  constructor(private serviciosResoluciones: ServiciosResolucionService) { console.log('out') }

  ngOnInit() {

    this.serviciosResoluciones.getPersonasOrg().subscribe(
      data => {  

        this.nombres=data.results.bindings;
        console.log(this.nombres);        
      },
      err => {
        console.log(err);
      }
    )
  
  }

  //INSERTO EL DOCUMENTO
  onClickDocumento(tema:string,autor:string,tipo:string,autortipo:string){
    this.serviciosResoluciones.insertDocumentoResolucion(this.resolucion.uri,tema,tipo,autor,autortipo).subscribe(
      data => {        
      },
      err => {
        console.log(err);
      }
    )    
  }

  //INSERTO LA ACCION
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
