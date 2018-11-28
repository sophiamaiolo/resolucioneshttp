import { Component, OnInit } from '@angular/core';
import { ServiciosRepartidoService } from '../servicios-repartido.service';

@Component({
  selector: 'app-listado-repartidos',
  templateUrl: './listado-repartidos.component.html',
  styleUrls: ['./listado-repartidos.component.css']
})
export class ListadoRepartidosComponent implements OnInit {

  repartidos: any[];
  repartido: any;
  test:string:

  constructor(private serviciosRepartido: ServiciosRepartidoService) { }

  ngOnInit() {
      this.serviciosRepartido.getAllRepartidos().subscribe(
      data => {
        console.log(data.results.bindings[0].p.value);
        this.repartidos=data.results.bindings;
      },
      err => {
        console.log(err);
      }
    );
  }

  onClickRepartido(value:string){
    this.test=value;
    alert(this.test);
  }
  

}
