import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  
  registerMode=false;
  forgotPassMode=false;
  users:any;
  
  constructor(public accountService: AccountService){}

  ngOnInit(): void {
    
  }

  registerToggle(){
    this.registerMode=!this.registerMode;
  }

  forgotToggle(){
    this.forgotPassMode=!this.forgotPassMode;
  }
  
  

  cancel(event: boolean){
    this.registerMode=event;
    this.forgotPassMode=event;
  }

}
