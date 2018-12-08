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
  // getAllResolucionesRepartido(uriRepartido:string):Observable<any> {
  //   var part1="SELECT ?n ?a WHERE { {graph base:final {?n resvocab:nroResolucion ?a}}"
  //   var part2="{SELECT ?n WHERE { {graph base:final {?q resvocab:repartidoResolucion ?n}} {SELECT * WHERE {BIND(IRI('"
  //   var part3="') as ?q) }}}}}";
  //   var query="query="+this.prefixBase+this.prefixRes+this.prefixResvocab+part1+part2+uriRepartido+part3;   
  //   return this.http.post(this.baseUrl+'query', query, this.httpOptionsInsert).pipe(
  //     map(this.extractData)      
  //   );       
  // }


   getAllResolucionesRepartido(uriRepartido:string):Observable<any> {
    var part1="SELECT ?num ?res ?acc ?doc where {{ SELECT ?num ?res ?acc (count(?d) as ?doc)"
    var part2="WHERE {graph base:final {?rep resvocab:nroRepartido ?num. ?res a resvocab:Resolucion. ?rep resvocab:repartidoResolucion ?res."
    var part3="{SELECT ?res (count(?a) as ?acc) WHERE {?res a resvocab:Resolucion. OPTIONAL{ ?res resvocab:resolucionAcciones ?a.}}";
    var part4="group by ?res }} OPTIONAL{ ?res resvocab:resolucionDocumentos ?d.}} group by ?num ?res ?acc}";
    var part5=" BIND(IRI('"+uriRepartido+"') as ?rep)}"
    var query="query="+this.prefixBase+this.prefixRes+this.prefixResvocab+part1+part2+part3+part4+part5;   
    return this.http.post(this.baseUrl+'query', query, this.httpOptionsInsert).pipe(
      map(this.extractData)      
    );       
  }

   /*INSERT DOCUMENTO-REPARTIDO*/
   insertDocumentoResolucion(uriResolucion:string, tema: string, tipo:string, autor: string, tipoorg:string):Observable<any> {

    if (tipoorg != "" ) {
      //es una org
      var part1='INSERT {GRAPH base:final {?q resvocab:resolucionDocumentos ?u. ?u resvocab:temaDocumento "'+tema+ '".';
      var part2='?u resvocab:tipoDocumento "'+tipo+'".';
      var part3=' ?u resvocab:tieneAutor ?a . '
      var part4=' ?a a resvocab:Organizacion . '
      var part5=' ?a resvocab:nombre "'+autor+'". ';
      var part6=' ?a resvocab:tipoOrganizacion "'+tipoorg+'". ';
      var part7="}} WHERE { GRAPH base:final {BIND(IRI('"
      var part8="') as ?q). BIND(UUID() as ?u) .";
      var part9= "BIND(IRI(concat('http://www.semanticweb.org/fing/ontologies/2018/resoluciones/','Organizacion', encode_for_uri('"+autor+"'))) as ?a)}}";
      var query="query="+this.prefixBase+this.prefixResvocab+part1+part2+part3+part4+part5+part6+part7+uriResolucion+part8+part9;   
    }
    else {
      //es una personas
      var part1='INSERT {GRAPH base:final {?q resvocab:resolucionDocumentos ?u. ?u resvocab:temaDocumento "'+tema+ '".';
      var part2='?u resvocab:tipoDocumento "'+tipo+'".';
      var part3=' ?u resvocab:tieneAutor ?a . '
      var part4=' ?a a resvocab:Persona . '
      var part5=' ?a resvocab:nombre "'+autor+'". ';     
      var part7="}} WHERE { GRAPH base:final {BIND(IRI('"
      var part8="') as ?q). BIND(UUID() as ?u) .";
      var part9= "BIND(IRI(concat('http://www.semanticweb.org/fing/ontologies/2018/resoluciones/','Persona',encode_for_uri('"+autor+"'))) as ?a)}}";
      var query="query="+this.prefixBase+this.prefixResvocab+part1+part2+part3+part4+part5+part7+uriResolucion+part8+part9; 

    }  

    return this.http.post(this.baseUrl+'update', query, this.httpOptionsInsert).pipe(
      map(this.extractData)      
    );       
  }
   
  //poner un check que diga que tipo es si persona u org. Si es org tiene que poner el tipo. En la consulta si es persona hago el insert 
  //a persona y si es organizacion va el tipo.

  /*INSERT DOCUMENTO-REPARTIDO*/
  insertAccionResolucion(uriResolucion:string, descripcion: string, involucrado:string):Observable<any> {

      //es una org
      var part1='INSERT {GRAPH base:final {?q resvocab:resolucionAccion ?acc. ?acc a resvocab:Accion . ';
      var part2='?acc resvocab:descripcionAccion "'+descripcion+'".';
      var part3=' ?acc resvocab:accionInvolucrados ?a .} '     
      var part4="} WHERE { GRAPH base:final {BIND(IRI('"
      var part5="') as ?q). BIND(UUID() as ?acc) .";
      var part6= "BIND(IRI(concat('http://www.semanticweb.org/fing/ontologies/2018/resoluciones/',encode_for_uri('"+involucrado+"'))) as ?a)}}";
      var query="query="+this.prefixBase+this.prefixResvocab+part1+part2+part3+part4+uriResolucion+part5+part6;   
       

    return this.http.post(this.baseUrl+'update', query, this.httpOptionsInsert).pipe(
      map(this.extractData)      
    );       
  }

  /*obtener todas las personas u org*/
  getPersonasOrg():Observable<any> {

    var data="select ?a ?b where { GRAPH base:final {?a resvocab:nombre ?b} } ";  
    var query="query="+this.prefixBase+this.prefixResvocab+data;   
       
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

 
  constructor(private http: HttpClient) { }
}
