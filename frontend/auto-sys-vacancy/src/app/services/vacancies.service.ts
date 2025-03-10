import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vacancy } from '../models/Vacancy';
import { environment } from '../../config';
import { CookieService } from "ngx-cookie-service";
@Injectable({
  providedIn: 'root'
})
export class VacanciesService {

  private apiUrl = environment.apiUrl;   
  sizePage=10;
  constructor(private http: HttpClient,private cookieservice:CookieService) {}

  createVacancy(vacancy: Vacancy): Observable<Vacancy> {
    return this.http.post<Vacancy>(this.apiUrl+'/addvacancy', vacancy);
  }
  getVacancyTitle():Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl+'/vacancies')
  }
  getVacancies(pageCandidate:number): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/getvacancy',{
      params:new  HttpParams({
        fromObject:{page:pageCandidate,size:10}
    })
    });
  }

  getOrderVacancies(mode:boolean,pageCandidate:number){
    return this.http.get<any>(`${this.apiUrl}/getvacancy`,{
      params:new  HttpParams({
        fromObject:{
          sort:mode ? 'new': 'old',
          page:pageCandidate,size:this.sizePage}
    })
    });
  }

  getVacancyById(id: number): Observable<Vacancy> {
    return this.http.get<Vacancy>(`${this.apiUrl}/${id}`);
  }

  getSearched(searchStr:string):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/searchedvacancy`,
      { params:new HttpParams({
          fromObject:{search:searchStr}
    })})
  }


  updateVacancy( vacancy: Vacancy): Observable<Vacancy> {
    return this.http.post<Vacancy>(`${this.apiUrl}/updatevacacy`, vacancy);
  }


  deleteVacancy(vacancy: Vacancy): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/deletevacancy`,vacancy);
  }
}
