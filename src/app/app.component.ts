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

  constructor(private http: HttpClient){}

  ngOnInit(): void{

  	/*this.http.get('https://api.github.com/users/seeschweiler').subscribe(data => {console.log(data);});*/

  	const httpOptions = {

  		headers: new HttpHeaders({

  			'Content-Type': 'application/json',
  			'Authorization': "Basic "+"YWRtaW46YWRtaW4="

  		})
  	}
    this.http.get('http://localhost:5820/myDBUY',httpOptions).subscribe(data => {alert(data);});
    

  	
  }

}