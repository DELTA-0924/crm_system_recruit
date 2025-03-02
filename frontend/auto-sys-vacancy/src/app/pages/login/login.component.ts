import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators,FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  verifedUser=false;
  userForm =  new FormGroup({
    login:new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(18)]),
    password:new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(12)]), 
  })
  constructor(private router:Router){

  }
  submitForm(){
    console.log(this.userForm.value)
    this.router.navigate(['/main'])
      // this.verifedUser=true

  }
}
