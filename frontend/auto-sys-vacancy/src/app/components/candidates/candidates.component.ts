import { Component, OnInit } from '@angular/core';
import { Candidate } from '../../models/Candidate';
import { TestCandidateService } from '../../services/test-candidate.service';
import { Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CreateCandidateComponent } from '../../modals/create-candidate/create-candidate.component';

@Component({
  selector: 'app-candidates',
  imports: [CommonModule,CreateCandidateComponent],
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.scss'
})
export class CandidatesComponent implements OnInit{
  candidates$!:Observable<Candidate[]> 
  selectedCandidate:Candidate| null=null;  
  isDetailOpen=false;
  constructor(private candidatesService:TestCandidateService){}
  ngOnInit(): void {

      this.candidates$=this.candidatesService.getCandidates()
  }
  OrderBy(event:Event){
    console.log("order by event ")
    const order=(event.target as HTMLSelectElement).value;
    this.candidates$=this.candidatesService.getCandidatesOrderBy(order=='newset')
  }
  OpenDetail(candidate:Candidate):void{
    this.selectedCandidate=candidate;    
    console.log(this.selectedCandidate)
    this.isDetailOpen=true;
  }
  CloseDetail():void{
    this.isDetailOpen=false
    this.selectedCandidate=null;
  }
}
