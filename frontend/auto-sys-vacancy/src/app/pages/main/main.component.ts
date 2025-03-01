
import { Component,ComponentRef,Type,ViewChild, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CandidatesComponent }from "../../components/candidates/candidates.component"
import { VacanciesComponent } from "../../components/vacancies/vacancies.component"; 
import { CommonModule } from '@angular/common';
import { CalendarComponent } from '../../components/calendar/calendar.component';

import { CreateCandidateComponent } from '../../modals/create-candidate/create-candidate.component';
import { CreateVacancyComponent } from '../../modals/create-vacancy/create-vacancy.component';
@Component({
  selector: 'app-main',
  imports: [CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  @ViewChild('modalContainer', { read: ViewContainerRef }) set container(vc: ViewContainerRef) {
    if (vc) {
      this.modalContainer = vc;
    }
  }
  private modalContainer!: ViewContainerRef;
  modalRef: ComponentRef<any> | null = null;

  selectedTable:string="Candidates"
  title = 'auto-sys-vacancy';
  selectedComponent:Type<any>|null=null
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
       this.SelectedModal=null
  }
  OpenModal(modal:string){
    
    this.SelectedModal = null;
    switch(modal) {
      case 'vacancies':
        this.SelectedModal =  CreateVacancyComponent;        
        break;
      case 'candidates':
        this.SelectedModal = CreateCandidateComponent ;
        break;
    }
           
    setTimeout(()=>{
      if (this.modalContainer && this.SelectedModal!=null) {
        this.modalContainer.clear(); // Удаляем предыдущий компонент
        
   
        
        this.modalRef = this.modalContainer.createComponent(this.SelectedModal!);
        
        // Подписка на событие закрытия
        this.modalRef.instance.CloseEvent.subscribe(() => this.CloseModalWindow());
      }
    },100)

    this.selectedComponent=null
  }

  CloseModalWindow() {
    
    this.modalContainer.clear();
    this.modalRef = null;
  }
}
