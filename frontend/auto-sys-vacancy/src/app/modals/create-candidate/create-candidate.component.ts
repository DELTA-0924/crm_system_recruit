import { Component, ViewEncapsulation,EventEmitter,Output, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,FormsModule,ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NgxIntlTelInputModule,SearchCountryField, CountryISO, PhoneNumberFormat  } from 'ngx-intl-tel-input';
import { Candidate } from '../../models/Candidate';
import { CommonModule } from '@angular/common';
import { CandidateService } from '../../services/candidate.service';
import { VacanciesService } from '../../services/vacancies.service';
import { Observable, of } from 'rxjs';
import { Offer } from '../../models/Offert';

@Component({
  selector: 'app-create-candidate',
  imports: [NgxIntlTelInputModule,	FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './create-candidate.component.html',
  styleUrl: './create-candidate.component.scss',
  encapsulation:ViewEncapsulation.None
	
})
export class CreateCandidateComponent implements OnInit{
	@Output() CloseEvent=new EventEmitter<void>();
	@Input() candidate:Candidate|null=null
	submitted=false;
	categories$:Observable<any[]>|null=null;
	categories:string[]=[]
	editMode:boolean=false
	CandidateForm!:FormGroup;
	offerModal:boolean=false
	offer: Offer = {
		fullName: this.candidate ? this.candidate.fullname: '',
		position: '',
		startDate: '',
		salary: '',
		probationPeriod: '',
		responsibilities: '',
		benefits: ''
	  };
	
	constructor(private fb: FormBuilder,private candidateService:CandidateService,private vacancyService:VacanciesService){
	}
	ngOnInit(): void {
		this.editMode=this.candidate!==null;
		console.log(this.candidate)
		
		
		this.vacancyService.getVacancyTitle().subscribe((data)=>{
			
			this.categories$=of(data);
		});
		console.log(this.categories$)
		this.CandidateForm= this.fb.group({
			phone: new FormControl(this.candidate ? this.candidate.phone : undefined, [Validators.required]),
			phone2:new FormControl(this.candidate ? this.candidate.phone2 : undefined,[Validators.required,Validators.pattern(/^\+?[0-9\s\-()]+$/)]),
			fullname:new FormControl(this.candidate ? this.candidate.fullname :'',[Validators.minLength(3),Validators.maxLength(52),Validators.required]),					
			meetDate:new FormControl(this.candidate ? this.candidate.meetDate :''),
			dateNote:new FormControl(this.candidate ? this.candidate.dateNote : ''),
			dateRec:new FormControl(this.candidate ? this.candidate.dateRec : ''),
			detail:new FormControl(this.candidate ? this.candidate.detail : '',[Validators.maxLength(180)]),
			email:new FormControl(this.candidate ? this.candidate.email :'',[Validators.required,Validators.email]),
			status:new FormControl(this.candidate ? this.candidate.status :'',[Validators.required]),
			education:new FormControl (this.candidate ? this.candidate.education:'',[Validators.required]),	
			experience:new FormControl(this.candidate ? this.candidate.experience:'no_experience',[Validators.required]),	
			vacancy:new FormControl(this.candidate ? this.candidate.vacancy:'',[Validators.required])
		})
		
	}
	separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  	PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
	
	changePreferredCountries() {
		this.preferredCountries = [CountryISO.India, CountryISO.Canada];
	}
	CloseModal(){	
		this.CloseEvent.emit()			
		console.log("close event on candidate")
	}
	CreateCandidate():void{
		
		if (this.CandidateForm.valid) {
			if(!this.editMode){
				let newCandidate: Candidate = this.CandidateForm.value;
				newCandidate.phone=this.CandidateForm.value.phone.internationalNumber;			
				console.log(newCandidate)	
				this.candidateService.createCandidate(newCandidate).subscribe((response)=>{
					//console.log(response)
				});
				this.CandidateForm.reset(); // Очистить форму
				this.submitted=false
			}
			else {
				const updatedCandidate={id:this.candidate!.id, ...this.CandidateForm.value}
				updatedCandidate.phone=this.CandidateForm.value.phone.internationalNumber;	
				console.log(updatedCandidate)
				this.candidateService.updateCandidate(this.candidate!.id!,updatedCandidate).subscribe((response)=>{
					//console.log(response)
				})
				this.CloseModal();
			}
		}
			this.submitted=true
	}
	onDelete():void{
		if(this.CandidateForm.valid){
		  console.log("click in delete")
		  const deleteCandidateId: number = this.CandidateForm.value.id;
		  this.candidateService.deleteCandidate(this.candidate!).subscribe();  
		}
	   }

	onSubmitOffer(){
		this.offer.fullName=this.candidate!.fullname;
		console.log(this.offer)

		this.candidateService.PostOffer(this.offer).subscribe(data=>{
			this.downloadPDF(data);
		})
	
	}
	downloadPDF(blob: Blob) {
		const fileURL = URL.createObjectURL(blob);
		const newTab = window.open();
		if (newTab) {
		  newTab.document.write(
			`<html><head><title>PDF Preview</title></head><body><iframe src="${fileURL}" width="100%" height="100%" style="border: none;"></iframe></body></html>`
		  );
		}
	  }
	  
}
