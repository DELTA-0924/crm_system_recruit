import { Component,Type } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CandidatesComponent }from "./components/candidates/candidates.component"
import { VacanciesComponent } from "./components/vacancies/vacancies.component"; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './components/calendar/calendar.component';
import {FullCalendarModule} from '@fullcalendar/angular'
import {CalendarOptions} from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import { CreateCandidateComponent } from './modals/create-candidate/create-candidate.component';
import { CreateVacancyComponent } from './modals/create-vacancy/create-vacancy.component';
@Component({
  selector: 'app-root',
  imports: [ CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  selectedTable:string="Candidates"
  title = 'auto-sys-vacancy';
  selectedComponent!:Type<any>;
  SelectedModal:Type<any>|null=null
  ShowComponent(component:string){
    switch(component){
      case 'vacancies':
        this.selectedComponent=VacanciesComponent
        break;
      case 'candidates':
        this.selectedComponent=CandidatesComponent
        break;
      case 'calendar':
        this.selectedComponent=CalendarComponent
        break;
    }    
  }
  OpenModal(modal:string){
    switch(modal) {
      case 'vacancies':
        this.SelectedModal = (this.SelectedModal === CreateVacancyComponent) ? null : CreateVacancyComponent;
        break;
      case 'candidates':
        this.SelectedModal = (this.SelectedModal === CreateCandidateComponent) ? null : CreateCandidateComponent;
        break;
    }
  }
}
