import { Component,Output,EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Vacancy } from '../../models/Vacancy';
import { VacanciesService } from '../../services/vacancies.service';
@Component({
  selector: 'app-create-vacancy',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-vacancy.component.html',
  styleUrl: './create-vacancy.component.scss'
})
export class CreateVacancyComponent implements OnInit{
 @Output() CloseEvent=new EventEmitter();
 @Input() vacancy:Vacancy|null=null;
 editMode:boolean=false;
 vacancyForm!: FormGroup;
 submitted=false;
 constructor(private fb: FormBuilder,private vacanciesService:VacanciesService) {

 }

 ngOnInit(): void {
  this.editMode=this.vacancy!==null;
  this.vacancyForm = this.fb.group({
    vacancyTitle: [this.vacancy ? this.vacancy.vacancyTitle: '', Validators.required],
    requirements:[this.vacancy ? this.vacancy.requirements: '',Validators.required],
    conditions:[this.vacancy ? this.vacancy.conditions: '',Validators.required],
    contactEmail:[this.vacancy ? this.vacancy.contactEmail: '', [Validators.required, Validators.email]],
    contactPhone:[this.vacancy ? this.vacancy.contactPhone: '', [Validators.required,Validators.pattern(/^\+?[0-9\s\-()]+$/)]],
    age:[this.vacancy ? this.vacancy.age: '', [Validators.max(100),Validators.min(0),Validators.required]],
    skills:[this.vacancy ? this.vacancy.skills: '', [Validators.required]],
    datePublish:[this.vacancy ? this.vacancy.datePublish: '', [Validators.required]],
    details:[this.vacancy ? this.vacancy.details: ''],
    education:[this.vacancy ? this.vacancy.education: '',[Validators.required]]
  });
 }
 CloseModal(){
  this.CloseEvent.emit()
 }
 onSubmit():void {
  

    if (this.vacancyForm.valid) {
      if(!this.editMode){
        const newVacancy: Vacancy = this.vacancyForm.value;
        console.log(newVacancy)
        this.vacanciesService.createVacancy(newVacancy).subscribe();
        this.vacancyForm.reset(); // Очистить форму
        this.submitted=false
      }
      else {
        const updatedVacncy={id:this.vacancy!.id,...this.vacancyForm.value}
        this.vacanciesService.updateVacancy(updatedVacncy).subscribe((response)=>{
        //  console.log(response)
        })
        console.log(updatedVacncy)
        this.CloseModal();
      }
    }
    this.submitted=true;
 }
 onDelete():void{
  if(this.vacancyForm.valid){
    console.log("click in delete")
    const deleteVacancyId: number = this.vacancyForm.value.id;
    this.vacanciesService.deleteVacancy(this.vacancy!).subscribe()  
  }
 }
}
