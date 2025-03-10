import { Injectable } from '@angular/core';
import { environment } from '../../config';
import { CookieOptions, CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Events } from '../models/Events';
import { INITIAL_EVENTS } from './event-utils';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private apiUrl = environment.apiUrl;
  private HeaderJson=new HttpHeaders().set("Content-Type","application/json")
  constructor(private cookieService:CookieService,private http:HttpClient) { }
  getEvents():Observable<Events[]>{
    return this.http.get<Events[]>(this.apiUrl+'/candidateslimited')
  }
  getEvbentsTest(){
    return INITIAL_EVENTS;
  }
  updateEvent(event:any){
    let idd:number=Number(event.id)
    console.log(idd)
    return this.http.get(this.apiUrl+'/updateMeetDate',{params:
      new HttpParams({
        fromObject:{id:Number(event.id),meetDate:event.meetDate}
      })
    })
  }
}
