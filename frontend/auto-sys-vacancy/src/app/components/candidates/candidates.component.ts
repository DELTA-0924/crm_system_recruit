import { Component, OnInit } from '@angular/core';
import { Candidate } from '../../models/Candidate';
import { Observable, of, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CreateCandidateComponent } from '../../modals/create-candidate/create-candidate.component';
import { CandidateService } from '../../services/candidate.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-candidates',
  imports: [CommonModule,CreateCandidateComponent,NgxPaginationModule],
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.scss'
})
export class CandidatesComponent implements OnInit{
  candidates$!:Observable<Candidate[]> 
  selectedCandidate:Candidate| null=null;  
  isDetailOpen=false;
  constructor(private candidatesService:CandidateService){}
  PageNumber=0
  ngOnInit(): void {
    this.loadCandidates()
  }

  loadCandidates(){
    this.candidatesService.getCandidates(this.PageNumber).subscribe((response)=>{
      this.candidates$=of(response.content)
    })
  }
  RefreshData(){
    this.loadCandidates()
  }
  OrderBy(event:Event){
    console.log("order by event ")
    const order=(event.target as HTMLSelectElement).value;
    this.candidatesService.getOrderCandidate(order=='new',this.PageNumber).subscribe(
      (response)=>{
        this.candidates$=of(response.content)
      }
    )
  }
  onSearch(searchStr:string):void{
    this.candidatesService.getSearched(searchStr).subscribe((response)=>{
      this.candidates$=of(response.content)
    })
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
  nextPage(){
    this.PageNumber++;
    this.loadCandidates()
  }
  prevPage(){
    this.PageNumber==0 ? this.PageNumber=0:this.PageNumber--

    this.loadCandidates()
  }
}
