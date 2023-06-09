import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordDto } from '../_models/resetPassword';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{
  @Output() cancelMode =new EventEmitter();
  modelForm: FormGroup =new FormGroup({});
  validationErrors:string[] | undefined;
  token!: string;
  email!: string;
  message:string='';

  constructor(private service:AccountService,
    private fb:FormBuilder, private route:ActivatedRoute){}

  ngOnInit(): void {
    this.initializeForm();

    this.token=this.route.snapshot.queryParams['token'];
    this.email=this.route.snapshot.queryParams['email'];
  }

  initializeForm(){
    this.modelForm=this.fb.group({
      password: ['',[Validators.minLength(4),Validators.maxLength(20)]],
      confirmPassword: ['',[Validators.required,this.matchValues('password')]],
    });
    this.modelForm.controls['password'].valueChanges.subscribe({
      next: ()=>this.modelForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }
  
  resetPassword(){
    const resetPassDto: ResetPasswordDto={
      password: this.modelForm.get('password')?.value,
      confirmPassword: this.modelForm.get('confirmPassword')?.value,
      token: this.token,
      email:this.email
    }

    this.service.resetPassword(resetPassDto).subscribe({
      next:()=>{this.message='Your password has been changed'},
      error:()=>this.message='Problem when resetting your password, please try again'
    })
  }

  cancel(){
    this.cancelMode.emit(false);
  }
  matchValues(match: string){
    return (control: AbstractControl)=>{
      return control.value===control.parent?.get(match)?.value ? null : {notMatching: true}
    }
  }
}
