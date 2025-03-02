import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Vacancy } from '../models/Vacancy';



@Injectable({
  providedIn: 'root'
})
export class TestVacanciesService {
  private vacancies: Vacancy[] = [
    { 
      id: 1, vacancyId: 101, vacancyTitle: "Frontend Developer", description: "",
      requirements: "", responsibilities: "", conditions: "Remote", salaryMin: 80000,
      salaryMax: 120000, employment_type: "Full-time", experience: "1-3 года",
      contactEmail: "hr@example.com", contactPhone: "+7 900 123-45-67"
    },
  ];
  private vacanciesSubject = new BehaviorSubject<Vacancy[]>(this.vacancies);

  constructor() {}

  // ✅ Получить вакансии (в виде Observable)
  getVacancies(): Observable<Vacancy[]> {
    return this.vacanciesSubject.asObservable();
  }

  // ✅ Добавить вакансию
  createVacancy(vacancy: Vacancy): void {
    vacancy.id = this.vacancies.length + 1; // Генерируем ID
    this.vacancies.push(vacancy);

    this.vacanciesSubject.next(this.vacancies); // Обновляем поток
  }

  // ✅ Удалить вакансию
  deleteVacancy(id: number): void {
    this.vacancies = this.vacancies.filter(v => v.id !== id);
    this.vacanciesSubject.next(this.vacancies);
  }
}
