import { Component, OnInit } from '@angular/core';
import { Candidate } from '../../models/Candidate';
import { TestCandidateService } from '../../services/test-candidate.service';
import { tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-candidates',
  imports: [CommonModule],
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.scss'
})
export class CandidatesComponent implements OnInit{
  candidates:Candidate[] =[];
  constructor(private candidatesService:TestCandidateService){}
  ngOnInit(): void {
      this.candidatesService.getCandidates().subscribe(data=>{
        console.log(data)
      this.candidates = data;
      console.log(this.candidates)
      })
  }

}
