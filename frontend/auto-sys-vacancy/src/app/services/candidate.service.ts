import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidate } from '../models/Candidate'; 
import { environment } from '../../config';
import { CookieService } from 'ngx-cookie-service';
import { Offer } from '../models/Offert';
@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  private apiUrl = environment.apiUrl;
  pageSize=10;
  constructor(private http: HttpClient) {}

  createCandidate(candidate: Candidate): Observable<any> {    
    return this.http.post<any>(this.apiUrl+"/addcandidate", candidate);
  }

  getCandidates(pageCanidate:number): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/getcandidats',{
      params:new  HttpParams({
        fromObject:{page:pageCanidate,size:this.pageSize}
    })
    });
  }

  getSearched(searchStr:string):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/searchedcandidate`,
      { params:new HttpParams({
          fromObject:{search:searchStr}
    })})
  }

  getOrderCandidate(mode:boolean,pageCandidate:number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/getcandidats`,{
      params:new  HttpParams({
        fromObject:{sort: mode ? 'new': 'old',
          page:pageCandidate,size:this.pageSize
         
        }
    })
    });
  }

  PostOffer(offer:Offer):Observable<Blob>{
    return this.http.post(this.apiUrl+'/download',offer,{responseType:'blob'})
  }

  getCandidateById(id: number): Observable<Candidate> {
    return this.http.get<Candidate>(`${this.apiUrl}/${id}`);
  }

  updateCandidate(canidateId: number, candidate: Candidate): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/chancandidate`, candidate,{params:new HttpParams({
      fromObject:{id:canidateId}
    })});
  }

  getStatistic():Observable<any>{
    return this.http.get(this.apiUrl+'/stats')
  }
  getExcel(): Observable<Blob> {
    return this.http.get(this.apiUrl + '/download', {
      responseType: 'blob', // Ожидаем файл в формате Blob
    });
  }
  
  deleteCandidate(candidate: Candidate): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/dellcandidate`,candidate);
  }
}
