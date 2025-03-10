import { Injectable } from '@angular/core';
import { environment } from '../../config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRegister,User } from '../models/User';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrlRegisetr = environment.apiUrl+"/register";
  private apiUrlLogin = environment.apiUrl+"/login";
  // private apiUrlRegisetr = environment.apiUrl+"/logout";
  constructor(private http:HttpClient) {  }
  Register(user:User):Observable<any>{
    return this.http.post(this.apiUrlRegisetr,user)
  }
  Login(user:User):Observable<any>{
    return this.http.post(this.apiUrlLogin,user)
  }
  Logout():Observable<any>{
    return this.http.get(this.apiUrlRegisetr)
  }
  
}
