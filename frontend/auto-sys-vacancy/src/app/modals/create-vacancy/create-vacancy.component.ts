import { Component,Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TestVacanciesService } from '../../services/test-vacancy.service';
import { Vacancy } from '../../models/Vacancy';
@Component({
  selector: 'app-create-vacancy',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-vacancy.component.html',
  styleUrl: './create-vacancy.component.scss'
})
export class CreateVacancyComponent {
 @Output() CloseEvent=new EventEmitter();
 vacancyForm: FormGroup;
 submitted=false;
 constructor(private fb: FormBuilder,private vacanciesService: TestVacanciesService) {
   this.vacancyForm = this.fb.group({
     vacancyTitle: ['', Validators.required],
     requirements:['',Validators.required],
     conditions:['',Validators.required],
     contactEmail: ['', [Validators.required, Validators.email]],
     contactPhone: ['', [Validators.required,Validators.pattern(/^\+?[0-9\s\-()]+$/)]],
     age: ['', [Validators.max(100),Validators.min(0),Validators.required]],
     skills: ['', [Validators.required]],
     datePublish: ['', [Validators.required]],
     details:[''],
     education:['',[Validators.required]]
   });
 }
 CloseModal(){
  this.CloseEvent.emit()
 }
 onSubmit():void {
  

    if (this.vacancyForm.valid) {
      const newVacancy: Vacancy = this.vacancyForm.value;
      console.log(newVacancy)
      this.vacanciesService.createVacancy(newVacancy);
      this.vacancyForm.reset(); // Очистить форму
      this.submitted=false
    }
    this.submitted=true;
 }
}
