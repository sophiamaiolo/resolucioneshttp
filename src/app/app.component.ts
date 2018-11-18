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
  baseUrl ='http://localhost:5820/myDBUY/';
  query = 'query?query=';

  constructor(private http: HttpClient){}

  ngOnInit(): void{

  	/*this.http.get('https://api.github.com/users/seeschweiler').subscribe(data => {console.log(data);});*/

  	const httpOptionsGet = {

  		headers: new HttpHeaders({

        'Content-Type': 'application/json',
        "cache-control": "no-cache",
        'Authorization': "Basic "+"YWRtaW46YWRtaW4=",
      })
  	}
    this.http.get('http://localhost:5820/myDBUY',httpOptionsGet).subscribe(data => {alert(data);});

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
  	
  }

}  