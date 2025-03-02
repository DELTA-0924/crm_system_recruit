import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Candidate } from '../models/Candidate';


@Injectable({
  providedIn: 'root'
})
export class TestCandidateService {
  private candidates: Candidate[] = [
    {
      id: 1,
      candidateId: 1001,
      name: 'Иван',
      surName: 'Иванов',
      phone: '+7 900 123 45 67',
      age: 25,
      status: 'В ожидании интервью',
      location: 'Москва',
      aboutme: 'Разработчик Java с 3-летним опытом работы.',
      meetDate: '2024-03-10',
      dateNote: 'Собеседование назначено на 15:00',
      email:"local@mail.com"
    },
    {
      id: 2,
      candidateId: 1002,
      name: 'Анна',
      surName: 'Петрова',
      phone: '+7 901 456 78 90',
      age: 28,
      status: 'Принят на работу',
      location: 'Санкт-Петербург',
      aboutme: 'Фронтенд-разработчик с опытом в Angular и React.',
      meetDate: '2024-02-20',
      dateNote: 'Заключение контракта 2024-02-25',
      email:"local@mail.com"
    }
  ]
  private candidatesSubject = new BehaviorSubject<Candidate[]>(this.candidates);

  constructor() {}

  // ✅ Получить всех кандидатов (Observable)
  getCandidates(): Observable<Candidate[]> {
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
