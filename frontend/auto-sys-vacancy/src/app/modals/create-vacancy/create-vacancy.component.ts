import { Component,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-vacancy',
  imports: [],
  templateUrl: './create-vacancy.component.html',
  styleUrl: './create-vacancy.component.scss'
})
export class CreateVacancyComponent {
 @Output() CloseEvent=new EventEmitter();
 CloseModal(){
  this.CloseEvent.emit()
 }
}
