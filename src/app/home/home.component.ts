import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  
  registerMode=false;
  users:any;
  url="https://localhost:7024/Users";
  constructor(private http:HttpClient){}
  ngOnInit(): void {
    this.getUsers();
  }

  registerToggle(){
    this.registerMode=!this.registerMode;
  }

  getUsers(){
    this.http.get(this.url).subscribe({
      next:response=>this.users=response,
      error:error=>console.log(error),
      complete:()=>console.log('Request has completed')
    })
  }

  cancelRegisterMode(event: boolean){
    this.registerMode=event;
  }

}