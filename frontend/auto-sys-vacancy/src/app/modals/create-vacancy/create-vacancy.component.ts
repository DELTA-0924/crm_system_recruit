import { Component,Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-create-vacancy',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-vacancy.component.html',
  styleUrl: './create-vacancy.component.scss'
})
export class CreateVacancyComponent {
 @Output() CloseEvent=new EventEmitter();
 jobForm: FormGroup;

 constructor(private fb: FormBuilder) {
   this.jobForm = this.fb.group({
     jobTitle: ['', Validators.required],
     description: ['', Validators.required],
     requirements:['',Validators.required],
     responsibilities:['',Validators.required],
     conditions:['',Validators.required],
     salaryMin: [null, [Validators.required, Validators.min(0)]],
     salaryMax: [null, [Validators.required]],
     contactEmail: ['', [Validators.required, Validators.email]],
     contactPhone: ['', [Validators.pattern(/^\+?[0-9\s\-()]+$/)]]
   });
 }
 CloseModal(){
  this.CloseEvent.emit()
 }
 onSubmit():void {
    console.log(this.jobForm.value)
    console.log(this.jobForm.status)
    console.log(this.jobForm.errors)
     this.jobForm.reset();
 }
}
