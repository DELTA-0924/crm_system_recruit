import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators,FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../models/User';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  verifedUser=false;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  userForm =  new FormGroup({
    login:new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(18)]),
    password:new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(12)]), 
  })
  constructor(private router:Router,private authService:AuthService){

  }
  submitForm(){
    this.errorMessage = null;
    this.successMessage = null;
    if(this.userForm.valid){
      console.log(this.userForm.value)
      const user:User={
        login:this.userForm.value.login!,
        password:this.userForm.value.password!
      }
      this.authService.Login(user).subscribe({
        next: (response) => {
          this.successMessage = 'Регистрация прошла успешно!';
          alert(this.successMessage)
          console.log(response);
          this.userForm.reset(); // Очистка формы после успешной регистрации
          
          document.cookie=`tasty-cookies=${response['token']}`
          this.router.navigate(['/main'])
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Ошибка регистрации. Попробуйте снова.';
          alert(this.errorMessage)
          console.error('Ошибка:', error);
        }
      });
      


    }
    
    

  }
}
