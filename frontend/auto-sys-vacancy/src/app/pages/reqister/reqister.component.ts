import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators,FormControl, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-reqister',
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './reqister.component.html',
  styleUrl: './reqister.component.scss'
})
export class ReqisterComponent {
  verifedPassword=false;
  userForm =  new FormGroup({
    login:new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(18)]),
    password:new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(12)]),
    verifyPassword:new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(12)])    
  })
  submitForm(){
    let password = this.userForm.value.password!
    let verifyPassword = this.userForm.value.verifyPassword!;
    if(password==verifyPassword)      
      console.log(this.userForm.value)
    else 
      this.verifedPassword=true
  }
}
