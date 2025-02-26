import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators,FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgxIntlTelInputModule,SearchCountryField, CountryISO, PhoneNumberFormat  } from 'ngx-intl-tel-input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@Component({
  selector: 'app-create-candidate',
  imports: [NgxIntlTelInputModule,	FormsModule,ReactiveFormsModule],
  templateUrl: './create-candidate.component.html',
  styleUrl: './create-candidate.component.scss'
})
export class CreateCandidateComponent {
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
