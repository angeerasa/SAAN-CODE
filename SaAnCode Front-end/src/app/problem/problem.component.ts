import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import {DataService} from '../services/data.service'


@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css']
})
export class ProblemComponent implements OnInit {
  problem!:any;
  write_solution:boolean = false;
  solution_code!:string;
  solution_output!:any;
  discussions!:any;
  submitForm=this.fb.group(
    {
      language:[''],
      solution_code:[''],
    }
  )
  Problem_Discussion:boolean= true; // true- displays problem | false- displays discussion
  constructor(private route:ActivatedRoute, 
              public service:DataService, 
              public http:HttpClient,
              public fb:FormBuilder
             ) {

   }

  async ngOnInit(): Promise<void> {
    let id= this.route.snapshot.paramMap.get('id');
    this.problem = await this.service.displayProblem(id);
    this.discussions = await this.service.getDiscussionsOfProblem(id);
  }
  Display_Problem_Discussion(){
    this.Problem_Discussion= !this.Problem_Discussion;
  }

  async solutionSubmit(){
    let id= this.route.snapshot.paramMap.get('id');
    let ques:any = await this.service.displayProblem(id);

    let obj_this = { // Not the original solution
      language: this.submitForm.value.language,
      script:this.submitForm.value.solution_code,
      stdIn:ques.testCases
    }
    let obj_original={ // this is the original solution
      language:ques.language,
      script:ques.solution,
      stdIn: ques.testCases
    }

    const output:any = await lastValueFrom(this.http.post('http://localhost:3000/getSolution',obj_this))
    const original_output:any = await lastValueFrom(this.http.post('http://localhost:3000/getSolution',obj_original))
    console.log("output:",output)
    console.log("original Output: ",original_output)
    if(output.output == original_output.output){
      return this.solution_output = "All Test Cases Successfully passed";
    }else{
      return this.solution_output=`wrong o/p. Check effectiveness and efficiency!\n${output.output}`
    } 
  }


}
