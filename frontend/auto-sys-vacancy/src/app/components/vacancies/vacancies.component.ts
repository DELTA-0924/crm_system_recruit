import { Component } from '@angular/core';
import { Vacancy } from '../../models/Vacancy';
import { TestVacanciesService } from '../../services/test-vacancy.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vacancies',
  imports: [CommonModule],
  templateUrl: './vacancies.component.html',
  styleUrl: './vacancies.component.scss'
})
export class VacanciesComponent {
  vacancies: Vacancy[] = [];

  constructor(private vacanciesService: TestVacanciesService) {}

  ngOnInit(): void {
    this.vacanciesService.getVacancies().subscribe(data => {
      console.log(data)
      this.vacancies = data;
      console.log(this.vacancies)
    });
  }

  deleteVacancy(id: number): void {
    this.vacanciesService.deleteVacancy(id);
  }
}
