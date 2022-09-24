import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
// import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-question',
  templateUrl: './post-question.component.html',
  styleUrls: ['./post-question.component.css']
})
export class PostQuestionComponent implements OnInit {
  hintCount:number;
  title!:String
  description!:String
  hints:any = [];
  hint!: String;
  constructor(private http:HttpClient,private service:DataService) { 
    this.hintCount = 0;
  }

  ngOnInit(): void {
  }

  addHintCount(){
    this.hintCount  = this.hintCount + 1;
    console.log(this.hintCount)
  }
  // postHint(){
  //   this.hints.push(hint:this.hint);
  //   this.hint="";
  // }

  postQuestion(){
    let question = {
      heading:this.title,
      description: this.description,
      hints: this.hints
    }
    this.service.createQuestion(question).subscribe(
      (response:any)=>{
        console.log(response);
      },
    (error)=>{
      console.log(error);
    }
    )
  }
}
