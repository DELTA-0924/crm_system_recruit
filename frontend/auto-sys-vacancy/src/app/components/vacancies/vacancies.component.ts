import { Component } from '@angular/core';
import { Vacancy } from '../../models/Vacancy';
import { CommonModule } from '@angular/common';
import { CreateVacancyComponent } from '../../modals/create-vacancy/create-vacancy.component';
import { Observable, of } from 'rxjs';
import { VacanciesService } from '../../services/vacancies.service';
import { CookieOptions, CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-vacancies',
  imports: [CommonModule,CreateVacancyComponent],
  templateUrl: './vacancies.component.html',
  styleUrl: './vacancies.component.scss'
})
export class VacanciesComponent {
  vacancies$!: Observable<Vacancy[]>
  vacancies:Vacancy[]|null=null;
  selectedVacancy:Vacancy|null=null
  isDetailOpen:boolean=false
  constructor(private vacanciesService: VacanciesService) {}
  pageNumber=0;
  ngOnInit(): void {
    this.loadVacancies();         
    };  
  loadVacancies() {
      this.vacanciesService.getVacancies(this.pageNumber).subscribe((data) => {
        this.vacancies = data.content;
   
        this.vacancies$ = of(this.vacancies!);
      });
    }
  RefreshData(){
   this.loadVacancies();  
  }
  onSearch(searchStr:string):void{
    this.vacanciesService.getSearched(searchStr).subscribe((response)=>{
      this.vacancies$=of(response.content)
    })
  }
  OrderBy(event:Event){
    const order=(event.target as HTMLSelectElement).value;
    this.vacanciesService.getOrderVacancies(order=='new',this.pageNumber).subscribe((data)=>{        
      this.vacancies=data.content;
      this.vacancies$ = of(this.vacancies!);
    });   
  }
  OpenDetail(vacancy:Vacancy):void{
    this.selectedVacancy=vacancy;
    this.isDetailOpen=true;
  }
  CloseDetail():void{
    this.selectedVacancy=null;
    this.isDetailOpen=false;
  }
  nextPage(){
    this.pageNumber++;
    this.loadVacancies()
  }
  prevPage(){
    this.pageNumber==0 ? this.pageNumber=0:this.pageNumber--

    this.loadVacancies()
  }
}
