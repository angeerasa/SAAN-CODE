import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-problems-list',
  templateUrl: './problems-list.component.html',
  styleUrls: ['./problems-list.component.css']
})
export class ProblemsListComponent implements OnInit {

  problems!:any;
  questions_display_type: string = "None";
  constructor(public service:DataService,private http:HttpClient) { 
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

}
