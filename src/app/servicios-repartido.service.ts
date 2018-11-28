import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse, } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiciosRepartidoService {

  baseUrl ='http://localhost:5820/dbresoluciones/';
  query = 'query?query=';
  
  prefixResoluciones="PREFIX resoluciones:<http://www.semanticweb.org/gabriela/ontologies/2018/10/resoluciones#> ";
  prefixResoluciones1="PREFIX resoluciones1:<http://www.semanticweb.org/gabriela/ontologies/2018/10/resoluciones/> ";
  prefixOwl="PREFIX owl:<http://www.w3.org/2002/07/owl#> . ";
  prefixBase = "PREFIX base:<http://www.fing.edu.uy/test/> ";

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
  getAllRepartidos():Observable<any> {
    //var data="select * where {graph base:final {?s resoluciones:nroRepartido ?p}}";
    var query="query=prefix base: <http://www.fing.edu.uy/test/> prefix res:<http://www.semanticweb.org/gabriela/ontologies/2018/10/resoluciones#> select * where {graph base:final {?s res:nroRepartido ?p}}"
    return this.http.post(this.baseUrl+'query', query, this.httpOptionsInsert).pipe(
      map(this.extractData)      
    );    
    /*.subscribe(
      // Successful responses call the first callback.
      data => {console.log('ok'+data.json()); },
      // Errors will call this callback instead:
      err => {console.log('Something went wrong!'+err);}
    );*/
  }
  

  /*INSERT REPARTIDO*/
  insertRepartido(uriRepartido: string) {

    var data="INSERT DATA {resoluciones1:"+uriRepartido+" a owl:NamedIndividual}";
    var query="query="+this.prefixResoluciones+this.prefixResoluciones1+data;
    this.http.post(this.baseUrl+'update', query, this.httpOptionsInsert).subscribe(
      // Successful responses call the first callback.
      data => {console.log('ok'); },
      // Errors will call this callback instead:
      err => {console.log('Something went wrong!'+err);}
    );
  }

  insertInfoSesionRepartido(uriRepartido: string, infoSesion: string) {

    var data="INSERT DATA {resoluciones1:"+uriRepartido+" resoluciones:infoSesion "+infoSesion+"}";
    var query="query="+this.prefixResoluciones+this.prefixResoluciones1+data;
    this.http.post(this.baseUrl+'update', query, this.httpOptionsInsert).subscribe(
      // Successful responses call the first callback.
      data => { console.log('ok'); },
      // Errors will call this callback instead:
      err => { console.log('Something went wrong!'+err); }
    );  
  }

  /*TO DO*/
  insertFechaRepartido(uriRepartido: string, fecha: string) {

    var data="INSERT DATA {resoluciones1:"+uriRepartido+" resoluciones:infoSesion "+"}";
    var query="query="+this.prefixResoluciones+this.prefixResoluciones1+data;
    this.http.post(this.baseUrl+'update', query, this.httpOptionsInsert).subscribe(
      // Successful responses call the first callback.
      data => { console.log('ok'); },
      // Errors will call this callback instead:
      err => { console.log('Something went wrong!'+err); }
    );  
  }

  /*TO DO*/
  insertNumeroRepartido(uriRepartido: string, numero: string) {

    var data="INSERT DATA {graph <http://www.fing.edu.uy/test/final> {resoluciones1:"+uriRepartido+" resoluciones:nroRepartido '"+numero+"'}}";
    var query="query="+this.prefixResoluciones+this.prefixResoluciones1+this.prefixBase+data;
    this.http.post(this.baseUrl+'update', query, this.httpOptionsInsert).subscribe(
      // Successful responses call the first callback.
      data => { console.log('ok'); },
      // Errors will call this callback instead:
      err => { console.log('Something went wrong!'+err); }
    );  
  }

  /*TO DO*/
  insertUrlPagRepartido(uriRepartido: string, url: string) {

    var data="INSERT DATA {resoluciones1:"+uriRepartido+" resoluciones:infoSesion "+"}";
    var query="query="+this.prefixResoluciones+this.prefixResoluciones1+data;
    this.http.post(this.baseUrl+'update', query, this.httpOptionsInsert).subscribe(
      // Successful responses call the first callback.
      data => { console.log('ok'); },
      // Errors will call this callback instead:
      err => { console.log('Something went wrong!'+err); }
    );  
  }

  /*TO DO*/
  insertResolucionRepartido(uriRepartido: string, uriResolucion: string) {

    var data="INSERT DATA {resoluciones1:"+uriRepartido+" resoluciones:infoSesion "+"}";
    var query="query="+this.prefixResoluciones+this.prefixResoluciones1+data;
    this.http.post(this.baseUrl+'update', query, this.httpOptionsInsert).subscribe(
      // Successful responses call the first callback.
      data => { console.log('ok'); },
      // Errors will call this callback instead:
      err => { console.log('Something went wrong!'+err); }
    );  
  }

   insertAsistenteDecanoRepartido(uriRepartido: string, nombre: string) {

    var data="INSERT DATA {resoluciones1:"+uriRepartido+" resoluciones:asistenteDecano resoluciones1:"+nombre+"}";
    var query="query="+this.prefixResoluciones+this.prefixResoluciones1+data;
    this.http.post(this.baseUrl+'update', query, this.httpOptionsInsert).subscribe(
      // Successful responses call the first callback.
      data => { console.log('ok'); },
      // Errors will call this callback instead:
      err => { console.log('Something went wrong!'+err); }
    );  
  }

  insertAsistenteEgresadoRepartido(uriRepartido: string, nombre: string) {

    var data="INSERT DATA {resoluciones1:"+uriRepartido+" resoluciones:asistenteEgresados resoluciones1:"+nombre+"}";
    var query="query="+this.prefixResoluciones+this.prefixResoluciones1+data;
    this.http.post(this.baseUrl+'update', query, this.httpOptionsInsert).subscribe(
      // Successful responses call the first callback.
      data => { console.log('ok'); },
      // Errors will call this callback instead:
      err => { console.log('Something went wrong!'+err); }
    );  
  }

  insertAsistenteDocenteRepartido(uriRepartido: string, nombre: string) {

    var data="INSERT DATA {resoluciones1:"+uriRepartido+" resoluciones:asistenteDocentes resoluciones1:"+nombre+"}";
    var query="query="+this.prefixResoluciones+this.prefixResoluciones1+data;
    this.http.post(this.baseUrl+'update', query, this.httpOptionsInsert).subscribe(
      // Successful responses call the first callback.
      data => { console.log('ok'); },
      // Errors will call this callback instead:
      err => { console.log('Something went wrong!'+err); }
    );  
  }

  insertAsistenteEstudiantilRepartido(uriRepartido: string, nombre: string) {

    var data="INSERT DATA {resoluciones1:"+uriRepartido+" resoluciones:asistenteEstudiantil resoluciones1:"+nombre+"}";
    var query="query="+this.prefixResoluciones+this.prefixResoluciones1+data;
    this.http.post(this.baseUrl+'update', query, this.httpOptionsInsert).subscribe(
      // Successful responses call the first callback.
      data => { console.log('ok'); },
      // Errors will call this callback instead:
      err => { console.log('Something went wrong!'+err); }
    );  
  }

  constructor(private http: HttpClient) { }
}
