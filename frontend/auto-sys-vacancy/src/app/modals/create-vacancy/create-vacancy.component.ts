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

 constructor(private fb: FormBuilder,private vacanciesService: TestVacanciesService) {
   this.vacancyForm = this.fb.group({
     vacancyTitle: ['', Validators.required],
     description: ['', Validators.required],
     requirements:['',Validators.required],
     responsibilities:['',Validators.required],
     conditions:['',Validators.required],
     salaryMin: [null, [Validators.required, Validators.min(0)]],
     salaryMax: [null, [Validators.required]],
     contactEmail: ['', [Validators.required, Validators.email]],
     contactPhone: ['', [Validators.pattern(/^\+?[0-9\s\-()]+$/)]],
       employment_type: ['full', Validators.required], // По умолчанию "Полный день"
  experience: ['no_experience', Validators.required] // По умолчанию "Без опыта"
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
    }
 }
}
