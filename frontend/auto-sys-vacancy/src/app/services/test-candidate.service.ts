import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Candidate } from '../models/Candidate';
import { DataCandidates } from './data';


@Injectable({
  providedIn: 'root'
})
export class TestCandidateService {
  private candidates: Candidate[] = DataCandidates;
  
  private candidatesSubject = new BehaviorSubject<Candidate[]>(this.candidates);

  constructor() {}

  // ✅ Получить всех кандидатов (Observable)
  getCandidates(): Observable<Candidate[]> {
    return this.candidatesSubject.asObservable();
  }
  getCandidatesOrderBy(mode: boolean): Observable<Candidate[]> {
    const sortedCandidates = [...this.candidates].sort((a, b) => 
      mode
        ? new Date(a.meetDate).getTime() - new Date(b.meetDate).getTime()
        : new Date(b.meetDate).getTime() - new Date(a.meetDate).getTime()
    );
  
    this.candidates = sortedCandidates; // Обновляем оригинальный массив
    this.candidatesSubject.next(sortedCandidates); // Обновляем BehaviorSubject
  
    return this.candidatesSubject.asObservable();
  }
  

  // ✅ Добавить кандидата
  createCandidate(candidate: Candidate): void {
    candidate.id = this.candidates.length + 1; // Генерируем ID
    this.candidates.push(candidate);
    this.candidatesSubject.next(this.candidates); // Обновляем поток
  }

  // ✅ Удалить кандидата
  deleteCandidate(id: number): void {
    this.candidates = this.candidates.filter(c => c.id !== id);
    this.candidatesSubject.next(this.candidates);
  }
}
