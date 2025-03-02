import { Injectable } from '@angular/core';
import { environment } from '../../config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRegister,User } from '../models/User';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl+"/register";
  constructor(private http:HttpClient) {  }
  Register(user:UserRegister):Observable<any>{
    return this.http.post(this.apiUrl,{"user":user})
  }
  Login(user:User):Observable<any>{
    return this.http.post(this.apiUrl,{"user":user})
  }
  Logout():Observable<any>{
    return this.http.get(this.apiUrl)
  }
}
