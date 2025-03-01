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
	CloseModal(){
		this.CloseEvent.emit()
		console.log("close event on candidate")
	}
	separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
	phoneForm = new FormGroup({
		phone: new FormControl(undefined, [Validators.required])
	});
	changePreferredCountries() {
		this.preferredCountries = [CountryISO.India, CountryISO.Canada];
	}
}
