import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Vacancy } from '../models/Vacancy';



@Injectable({
  providedIn: 'root'
})
export class TestVacanciesService {
  private vacancies: Vacancy[] = [
    {
      id: 1,
      vacancyTitle: "Frontend Developer",
      age: 25,
      requirements: "Опыт работы с Angular, TypeScript, знание HTML, CSS, REST API",
      conditions: "Удалённо",
      skills: "Angular, TypeScript, RxJS, SCSS, Git",
      education: "Высшее",
      contactEmail: "hr@example.com",
      contactPhone: "+7 (999) 123-45-67",
      datePublish: "2024-12-01T15:00",
      details:"sdgfsdg dfhgdgh dfghdh"
    }
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
