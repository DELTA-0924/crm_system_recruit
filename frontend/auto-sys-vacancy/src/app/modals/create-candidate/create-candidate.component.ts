import { Component, ViewEncapsulation,EventEmitter,Output } from '@angular/core';
import { FormGroup, FormControl, Validators,FormsModule,ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NgxIntlTelInputModule,SearchCountryField, CountryISO, PhoneNumberFormat  } from 'ngx-intl-tel-input';
import { TestCandidateService } from '../../services/test-candidate.service';
import { Candidate } from '../../models/Candidate';

@Component({
  selector: 'app-create-candidate',
  imports: [NgxIntlTelInputModule,	FormsModule,ReactiveFormsModule],
  templateUrl: './create-candidate.component.html',
  styleUrl: './create-candidate.component.scss',
  encapsulation:ViewEncapsulation.None
	
})
export class CreateCandidateComponent {
	@Output() CloseEvent=new EventEmitter<void>();
	CandidateForm:FormGroup;
	constructor(private fb: FormBuilder,private candidateServices:TestCandidateService){
		this.CandidateForm= this.fb.group({
			phone: new FormControl(undefined, [Validators.required]),
			name:new FormControl('',[Validators.minLength(3),Validators.maxLength(12),Validators.required]),
			surName:new FormControl('',[Validators.minLength(3),Validators.maxLength(12),Validators.required]),
			age:new FormControl('',[Validators.min(18),Validators.max(64),Validators.required]),
			meetDate:new FormControl(''),
			dateNote:new FormControl(''),
			aboutme:new FormControl('',[Validators.maxLength(180)]),
			email:new FormControl('',[Validators.required,Validators.email]),
			status:new FormControl('invited'),
			location:new FormControl('',[Validators.required]),
	
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
			const newCandidate: Candidate = this.CandidateForm.value;
			console.log(newCandidate)
			this.candidateServices.createCandidate(newCandidate);
			this.CandidateForm.reset(); // Очистить форму
			}
	}
}
