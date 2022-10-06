import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { DataService } from '../services/data.service';
// import { FormsModule } from '@angular/forms';

interface Question{
  heading:string,
  description:string,
  hints:hint[],
  relatedTopics:topic[],
  solution:string,
  testCases:string,
  language:string
}
interface hint{
  hint:string
}
interface topic{
  topic:string
}

@Component({
  selector: 'app-post-question',
  templateUrl: './post-question.component.html',
  styleUrls: ['./post-question.component.css']
})

export class PostQuestionComponent implements OnInit {
  hnts:hint[]=[];
  title!:string
  description!:string
  relatedTopics!:string;
  hnt!: string;
  test_cases!:string;
  original_solution!:string;
  language_used!: string;

  constructor(private http:HttpClient,private service:DataService) { 
  }

  ngOnInit(): void {
  }

  addHint(){//Adds hint to array ONLY on clicking
    let hnt:hint={
      hint:this.hnt
    }
    this.hnts.push(hnt);
    this.hnt=''
  }
  // postHint(){
  //   this.hints.push(hint:this.hint);
  //   this.hint="";
  // }

  postQuestion(){
    let Topics: topic[]=[]
    let tcs = this.relatedTopics.split(" ");
    tcs.forEach(element => {
      let tpc:topic={
        topic: element
      }
      Topics.push(tpc);
    });
    let question:Question={
      heading: this.title,
      description: this.description,
      relatedTopics: Topics,
      hints: this.hnts,
      solution: this.original_solution,
      testCases: this.test_cases,
      language:this.language_used
    };
    this.service.original_code_language=this.language_used
    this.service.createQuestion(question).subscribe(
      (res:any)=>{
        console.log(res);
      }
    )
  }
    
    // OLD CODE:
    //---------
    // let question = {
    //   heading:this.title,
    //   description: this.description,
    //   hints: this.hints
    // }
    // this.service.createQuestion(question).subscribe(
    //   (response:any)=>{
    //     console.log(response);
    //   },
    // (error)=>{
    //   console.log(error);
    // }
    // )

    async solutionSubmit(){
      let obj = {
        language: this.language_used,
        script:this.original_solution,
        stdIn: this.test_cases
      }
  
      const output = await lastValueFrom(this.http.post('http://localhost:3000/getSolution',obj))
      console.log(output)
    }

  
}
