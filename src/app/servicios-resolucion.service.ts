import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ServiciosResolucionService {
  baseUrl ='http://localhost:5820/dbresoluciones/';
  query = 'query?query=';
  
  prefixResvocab="PREFIX resvocab:<http://www.semanticweb.org/fing/ontologies/2018/resoluciones#> ";
  prefixRes="PREFIX res:<http://www.semanticweb.org/fing/ontologies/2018/resoluciones/> ";
  prefixOwl="PREFIX owl:<http://www.w3.org/2002/07/owl#> ";
  prefixBase = "PREFIX base:<http://www.fing.edu.uy/test/base/> ";
  prefixVocab = "<http://www.fing.edu.uy/test/vocab#> ";

  

  httpOptionsInsert= {

    headers: new HttpHeaders({
      "Accept":"application/sparql-results+json",
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Basic YWRtaW46YWRtaW4=",
    })
  }
  
  nroRes='';

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  /*GET ALL REPARTIDOS*/
  getAllResolucionesRepartido(uriRepartido:string):Observable<any> {
    var part1="SELECT ?n WHERE { {graph base:final {?q resvocab:repartidoResolucion ?n}} {SELECT * WHERE {BIND(IRI('"
    var part2="') as ?q) }}}";
    var query="query="+this.prefixBase+this.prefixRes+this.prefixResvocab+part1+uriRepartido+part2;   
    return this.http.post(this.baseUrl+'query', query, this.httpOptionsInsert).pipe(
      map(this.extractData)      
    );       
  }

  /*INSERT REPARTIDO*/
  insertResolucion(uriResolucion: string) {

    var data="INSERT DATA {resoluciones1:"+uriResolucion+" a owl:NamedIndividual}";
    var query="query="+this.prefixResvocab+this.prefixRes+this.prefixOwl+data;
    this.http.post(this.baseUrl+'update', query, this.httpOptionsInsert).subscribe(
      // Successful responses call the first callback.
      data => {console.log('ok'); },
      // Errors will call this callback instead:
      err => {console.log('Something went wrong!'+err);}
    );
  }

  /*INSERT NUMERO REPARTIDO*/
  insertNumeroResolucion(uriResolucion: string,numeroResolucion:string) {

    var data="INSERT DATA {resoluciones1:"+uriResolucion+" resoluciones:nroResolucion resoluciones1:"+numeroResolucion+"}";
    var query="query="+this.prefixResvocab+this.prefixRes+data;
    this.http.post(this.baseUrl+'update', query, this.httpOptionsInsert).subscribe(
      // Successful responses call the first callback.
      data => {console.log('ok'); },
      // Errors will call this callback instead:
      err => {console.log('Something went wrong!'+err);}
    );
  }

  /*INSERT EXPEDIENTE REPARTIDO*/
  insertExpedienteResolucion(uriResolucion: string,uriExpediente:string) {

    var data="INSERT DATA {resoluciones1:"+uriResolucion+" resoluciones:resolucionExpediente resoluciones1:"+uriExpediente+"}";
    var query="query="+this.prefixResvocab+this.prefixRes+data;
    this.http.post(this.baseUrl+'update', query, this.httpOptionsInsert).subscribe(
      // Successful responses call the first callback.
      data => {console.log('ok'); },
      // Errors will call this callback instead:
      err => {console.log('Something went wrong!'+err);}
    );
  }

  /*INSERT EXPEDIENTE REPARTIDO*/
  insertSolicitanteResolucion(uriResolucion: string,uriSolicitante:string) {

    var data="INSERT DATA {resoluciones1:"+uriResolucion+" resoluciones:resolucionSolicitante resoluciones1:"+uriSolicitante+"}";
    var query="query="+this.prefixResvocab+this.prefixRes+data;
    this.http.post(this.baseUrl+'update', query, this.httpOptionsInsert).subscribe(
      // Successful responses call the first callback.
      data => {console.log('ok'); },
      // Errors will call this callback instead:
      err => {console.log('Something went wrong!'+err);}
    );
  }

  /*INSERT CANT VOTOS REPARTIDO*/
  insertCantVotosResolucion(uriResolucion: string,cantVotos:number) {

    var data="INSERT DATA {resoluciones1:"+uriResolucion+" resoluciones:cantVotosResolucion "+cantVotos+"}";
    var query="query="+this.prefixResvocab+this.prefixRes+data;
    this.http.post(this.baseUrl+'update', query, this.httpOptionsInsert).subscribe(
      // Successful responses call the first callback.
      data => {console.log('ok'); },
      // Errors will call this callback instead:
      err => {console.log('Something went wrong!'+err);}
    );
  }

  /*INSERT FECHA REPARTIDO*/
  insertFechaResolucion(uriResolucion: string,fecha:string) {

    var data="INSERT DATA {resoluciones1:"+uriResolucion+" resoluciones:fecha "+fecha+"^^xsd:dateTime}";
    var query="query="+this.prefixResvocab+this.prefixRes+data;
    this.http.post(this.baseUrl+'update', query, this.httpOptionsInsert).subscribe(
      // Successful responses call the first callback.
      data => {console.log('ok'); },
      // Errors will call this callback instead:
      err => {console.log('Something went wrong!'+err);}
    );
  }

  /*INSERT ACCION REPARTIDO*/
  insertAccionResolucion(uriResolucion: string,uriAccion:string) {

    var data="INSERT DATA {resoluciones1:"+uriResolucion+" resoluciones:resolucionAcciones resoluciones1:"+uriAccion+"}";
    var query="query="+this.prefixResvocab+this.prefixRes+data;
    this.http.post(this.baseUrl+'update', query, this.httpOptionsInsert).subscribe(
      // Successful responses call the first callback.
      data => {console.log('ok'); },
      // Errors will call this callback instead:
      err => {console.log('Something went wrong!'+err);}
    );
  }

  /*INSERT DOCUMENTO REPARTIDO*/
  insertDocumentoResolucion(uriResolucion: string,uriDocumento:string) {

    var data="INSERT DATA {resoluciones1:"+uriResolucion+" resoluciones:resolucionDocumentos resoluciones1:"+uriDocumento+"}";
    var query="query="+this.prefixResvocab+this.prefixRes+data;
    this.http.post(this.baseUrl+'update', query, this.httpOptionsInsert).subscribe(
      // Successful responses call the first callback.
      data => {console.log('ok'); },
      // Errors will call this callback instead:
      err => {console.log('Something went wrong!'+err);}
    );
  }
  constructor(private http: HttpClient) { }
}
