import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CandidatesComponent }from "./components/candidates/candidates.component"
import { VacanciesComponent } from "./components/vacancies/vacancies.component"; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [CandidatesComponent, VacanciesComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  selectedTable:string="Candidates"
  title = 'auto-sys-vacancy';
}
