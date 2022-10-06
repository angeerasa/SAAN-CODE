import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { HttpClient } from '@angular/common/http'
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-problems-list',
  templateUrl: './problems-list.component.html',
  styleUrls: ['./problems-list.component.css']
})
export class ProblemsListComponent implements OnInit {
  currProblem!:any;
  problems!:any;
  sorted_order:boolean= false // False - Ascending True - Descending
  questions_display_type: string = "None";
  constructor(public service:DataService,private http:HttpClient,private router:Router) { 
    this.http.get('http://localhost:3000/problems').subscribe(
      (res:any)=>{
        this.problems = res;
        console.log('problems found')
      }
    )
  }

  ngOnInit(): void {
  }
  async creatorDetails(problem_id:string){
    const {creator, userProblems} = await this.service.getProfileByProblemId(problem_id);
    alert(`Name:${creator.name}\nOccupation:${creator.occupation}\nAge:${creator.age}\nNo. of Problems Posted:${userProblems}`)
    // if(!creator){
    //   var username= prompt('You are not logged in:\n Please Enter User name:')
    //   var password = prompt('Please enter your password');
    //   this.service.login({email:username, password})
    //   this.creatorDetails(problem_id)
    // }
  }

  async displayProblem(prob:any){
    // prob -> problem id
    this.router.navigate([`problem/${prob}`]);
  }

  sortProblems(){
    if(this.sorted_order){
      this.problems = this.problems.sort((a:any,b:any)=>a.difficulty-b.difficulty)
    }
    else{
      this.problems=this.problems.sort((a:any,b:any)=>b.difficulty-a.difficulty);
    }
    this.sorted_order = !this.sorted_order
  }

}
