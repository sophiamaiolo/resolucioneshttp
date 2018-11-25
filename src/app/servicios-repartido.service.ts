import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiciosRepartidoService {

  baseUrl ='http://localhost:5820/resoluciones/';
  query = 'query?query=';
  
  prefixResoluciones="PREFIX resoluciones:<http://www.semanticweb.org/gabriela/ontologies/2018/10/resoluciones#> ";
  prefixResoluciones1="PREFIX resoluciones1:<http://www.semanticweb.org/gabriela/ontologies/2018/10/resoluciones/> ";
  prefixOwl="PREFIX owl:<http://www.w3.org/2002/07/owl#> . ";

  httpOptionsInsert= {

    headers: new HttpHeaders({

      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Basic YWRtaW46YWRtaW4=",
    })
  }
  
  nroRes='';

  /*INSERT REPARTIDO*/
  insertRepartido(uriRepartido: string){

    var data="INSERT DATA {resoluciones1:"+uriRepartido+" a owl:NamedIndividual}";

    var query="query="+this.prefixResoluciones+this.prefixResoluciones1+data;

    this.http.post(this.baseUrl+'update', query, this.httpOptionsInsert).subscribe();
  }


  constructor(private http: HttpClient) { }
}
