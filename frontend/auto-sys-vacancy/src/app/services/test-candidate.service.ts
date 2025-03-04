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
      fullname: 'Иван Иванов',
      phone: '+7 900 123 45 67',
      experience: "от 1 года",
      status: 'В ожидании интервью',
      education: 'Среднее образовательное',
      detail: 'Разработчик Java с 3-летним опытом работы.',
      meetDate: '2024-03-10',
      dateNote: 'Собеседование назначено на 15:00',
      email:"local@mail.com",
      skills:" мощный мужик"
    },
    {
      id: 2,
      fullname: 'Анна Петрова',      
      phone: '+7 901 456 78 90',
      experience: "от 1 года",
      status: 'Принят на работу',
      education: 'ВЫсшее',
      detail: 'Фронтенд-разработчик с опытом в Angular и React.',
      meetDate: '2024-02-20',
      dateNote: 'Заключение контракта 2024-02-25',
      email:"local@mail.com",
      skills:" мощная женщина"
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
