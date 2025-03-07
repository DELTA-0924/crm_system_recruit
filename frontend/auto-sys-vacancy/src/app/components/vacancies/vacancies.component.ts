import { Component } from '@angular/core';
import { Vacancy } from '../../models/Vacancy';
import { TestVacanciesService } from '../../services/test-vacancy.service';
import { CommonModule } from '@angular/common';
import { CreateVacancyComponent } from '../../modals/create-vacancy/create-vacancy.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vacancies',
  imports: [CommonModule,CreateVacancyComponent],
  templateUrl: './vacancies.component.html',
  styleUrl: './vacancies.component.scss'
})
export class VacanciesComponent {
  vacancies$!: Observable<Vacancy[]>
  selectedVacancy:Vacancy|null=null
  isDetailOpen:boolean=false
  constructor(private vacanciesService: TestVacanciesService) {}

  ngOnInit(): void {
      this.vacancies$=this.vacanciesService.getVacancies();
      console.log(this.vacancies$)
    };  

  deleteVacancy(id: number): void {
    this.vacanciesService.deleteVacancy(id);
  }
  OpenDetail(vacancy:Vacancy):void{
    this.selectedVacancy=vacancy;
    this.isDetailOpen=true;
  }
  CloseDetail():void{
    this.selectedVacancy=null;
    this.isDetailOpen=false;
  }
}
