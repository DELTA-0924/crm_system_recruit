import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators,FormControl, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User, UserRegister } from '../../models/User';
@Component({
  selector: 'app-reqister',
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './reqister.component.html',
  styleUrl: './reqister.component.scss'
})
export class ReqisterComponent {
  verifedPassword=false;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  userForm =  new FormGroup({
    login:new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(18)]),
    password:new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(12)]),
    verifyPassword:new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(12)])    
  })
  constructor(private authService:AuthService){}
  submitForm(){
    this.errorMessage = null;
    this.successMessage = null;
    if(this.userForm.valid){
    let password = this.userForm.value.password!
    let verifyPassword = this.userForm.value.verifyPassword!;
    if(password==verifyPassword) {     
      this.verifedPassword=false
      const user:User={login:this.userForm.value.login!,password}
      this.authService.Register(user).subscribe({
        next: (response) => {
          this.successMessage = 'Регистрация прошла успешно!';
          alert(this.successMessage)
          console.log(response);
          this.userForm.reset(); // Очистка формы после успешной регистрации
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Ошибка регистрации. Попробуйте снова.';
          alert(this.errorMessage)
          console.error('Ошибка:', error);
        }
      });
      console.log(this.userForm.value)
    }
    else 
      this.verifedPassword=true
  }
  }
}
