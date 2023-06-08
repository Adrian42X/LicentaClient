import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { ForgotPassword } from '../_models/forgotPassword';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  @Output() cancelMode =new EventEmitter();
  modelForm: FormGroup =new FormGroup({});
  validationErrors:string[] | undefined;
  emailSent=false;
  baseUrl=environment.apiUrl;
  message='';


  constructor(private accountService:AccountService,
    private fb:FormBuilder, private router:Router) { }
  

    ngOnInit(): void {
      this.initializeForm();
    }

    initializeForm(){
      this.modelForm=this.fb.group({
        email:['',Validators.email],
      });
    }

    sendEmail(){
      const forgotPass: ForgotPassword={
        email:this.modelForm.get('email')?.value,
        clientURI: 'https://localhost:4200/resetpassword'
      }
      this.accountService.forgotPassword(forgotPass).subscribe({
        next: ()=>{this.message='The link has been sent to your email'},
        error: ()=>this.message='Invalid email, please check if you have an account with this email'
        
      })
    }

    cancel(){
      this.cancelMode.emit(false);
    }
}
