import { Component, ViewEncapsulation,EventEmitter,Output } from '@angular/core';
import { FormGroup, FormControl, Validators,FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgxIntlTelInputModule,SearchCountryField, CountryISO, PhoneNumberFormat  } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-create-candidate',
  imports: [NgxIntlTelInputModule,	FormsModule,ReactiveFormsModule],
  templateUrl: './create-candidate.component.html',
  styleUrl: './create-candidate.component.scss',
  encapsulation:ViewEncapsulation.None
	
})
export class CreateCandidateComponent {
	@Output() CloseEvent=new EventEmitter<void>();

	separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  	PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
	CandidateForm=new FormGroup({
		phone: new FormControl(undefined, [Validators.required]),
		name:new FormControl('',[Validators.minLength(3),Validators.maxLength(12),Validators.required]),
		surName:new FormControl('',[Validators.minLength(3),Validators.maxLength(12),Validators.required]),
		age:new FormControl('',[Validators.min(18),Validators.max(64),Validators.required]),
		aboutme:new FormControl('',[Validators.maxLength(180)])
	})
	changePreferredCountries() {
		this.preferredCountries = [CountryISO.India, CountryISO.Canada];
	}
	CloseModal(){
		this.CloseEvent.emit()
		console.log("close event on candidate")
	}
	CreateCandidate():void{
		console.log(this.CandidateForm.value)
		this.CandidateForm.reset();
	}
}
