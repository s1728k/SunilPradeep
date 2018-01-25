import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  api ={};
  release_person = "";

  constructor(private http:HttpClient){}

  ngOnInit(){
  	this.getdata();
  }

  getdata(){
  	const url = "http://localhost:8081/api";
  	this.http.get(url).subscribe((data:any)=>{
  		console.log(data);
  		this.api=data;
  	})
  }

  sendOnDuty(){
  	let httpOptions = {
	    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
	};
  	const url = "http://localhost:8081/send";
  	this.http.post(url, {}).subscribe((data:any)=>{
  		console.log(data);
  		this.api=data;
  	})
  }

  releaseOnDuty(){
  	const url = "http://localhost:8081/release";
  	this.http.post(url, {"name":this.release_person}).subscribe((data:any)=>{
  		console.log(data);
  		this.api=data;
  	})
  }

}
