import { Component } from '@angular/core';
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
@Component({
  selector: 'app-root',
  imports: [CandidatesComponent, VacanciesComponent,CommonModule,CalendarComponent,CreateCandidateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  selectedTable:string="Candidates"
  title = 'auto-sys-vacancy';

}
