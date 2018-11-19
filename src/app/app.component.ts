import { Component , OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'resolucioneshttp';
  results = '';
  baseUrl ='http://localhost:5820/resoluciones/';
  query = 'query?query=';
  
  nroRes='';

  onKey(nroRes: string) {
    this.nroRes += nroRes;
    this.insertResolucion(this.nroRes);
  }

  onClickMe(){
    this.getBD();
  }

  constructor(private http: HttpClient){}

  insertResolucion(nroRes: string){

    /*INSERT DATA */
    const httpOptionsInsert= {

  		headers: new HttpHeaders({

        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic YWRtaW46YWRtaW4=",
    	})
  	}
    
    //var insert = "query=PREFIX%20res%3A%3Chttp%3A%2F%2Fwww.semanticweb.org%2Fgabriela%2Fontologies%2F2018%2F10%2Fresoluciones%2F%3E%20PREFIX%20res2%3A%3Chttp%3A%2F%2Fwww.semanticweb.org%2Fgabriela%2Fontologies%2F2018%2F10%2Fresoluciones%23%3E%20INSERT%20DATA%20%7B%20res%3ARep118F20180223%20res2%3AnroRepartido%20%221%2F19%22%20%7D&undefined=";

    var prefix="PREFIX res:<http://www.semanticweb.org/gabriela/ontologies/2018/10/resoluciones/> ";
    prefix+="PREFIX res2:<http://www.semanticweb.org/gabriela/ontologies/2018/10/resoluciones#> ";

    var data="INSERT DATA {res:Rep118F20180224 res2:nroRepartido "+'"'+this.nroRes+'"'+"}";

    var query="query="+prefix+data;

    this.http.post(this.baseUrl+'update', query, httpOptionsInsert).subscribe(data => {alert(data);});
  }

  ngOnInit(): void{
  }

  getBD(): void{

  	/*GET BD*/

  	const httpOptionsGet = {

  		headers: new HttpHeaders({

        'Content-Type': 'application/json',
        "cache-control": "no-cache",
        'Authorization': "Basic "+"YWRtaW46YWRtaW4=",
      })
  	}
    this.http.get(this.baseUrl,httpOptionsGet).subscribe(data => {alert(data);});

    /*SELECT*/
    
    const httpOptions = {

  		headers: new HttpHeaders({

        "Accept": "application/sparql-results+json",
        "Authorization": "Basic YWRtaW46YWRtaW4=",
        "cache-control": "no-cache",
        "Postman-Token": "2711076e-7a64-44d3-b56a-0927ad52f61b"
  		})
  	}

    
    this.query +='SELECT DISTINCT ?s WHERE { ?s ?p ?o } LIMIT 10';
    this.http.get(this.baseUrl+this.query, httpOptions).subscribe(data => {alert(data);});
    
    /*INSERT DATA
    const httpOptionsInsert= {

  		headers: new HttpHeaders({

        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic YWRtaW46YWRtaW4=",
    	})
  	}
    
    var insert = "query=PREFIX%20res%3A%3Chttp%3A%2F%2Fwww.semanticweb.org%2Fgabriela%2Fontologies%2F2018%2F10%2Fresoluciones%2F%3E%20PREFIX%20res2%3A%3Chttp%3A%2F%2Fwww.semanticweb.org%2Fgabriela%2Fontologies%2F2018%2F10%2Fresoluciones%23%3E%20INSERT%20DATA%20%7B%20res%3ARep118F20180223%20res2%3AnroRepartido%20%221%2F19%22%20%7D&undefined=";

    this.http.post(this.baseUrl+'update', insert, httpOptionsInsert).subscribe(data => {alert(data);}); */
    

  }

}  