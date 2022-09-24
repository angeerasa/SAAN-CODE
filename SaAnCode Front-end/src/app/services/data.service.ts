import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Login, User } from './interfaces/login.interface';
import { lastValueFrom, Observable, throwError } from 'rxjs';
import { UrlSerializer } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService{
  authToken!: String;
  
  constructor(public http:HttpClient) { }

  createQuestion(question:any){
    console.log('ENTERED INTO CREATEQUESTION', this.authToken)
    const header = new HttpHeaders().set('Authorization',`Bearer ${this.authToken}`)
    return this.http.post("http://localhost:3000/write/problem",question,{headers:header})
  }
  getProfile():Observable<User>{ // returns observable
    const head = new HttpHeaders().set('Authorization',  `Bearer ${this.authToken}`)
    return this.http.get<User>('http://localhost:3000/login/me', {headers:head});  
  }

  async getProfileByProblemId(problemId:string){ // name, age, occ, problems_write_count
    if(!this.authToken){
      let email = prompt('You are not authenticated.\nPlease Enter User Name:');
      let password = prompt('Please Enter your Password:');
      await this.login({email,password});
    }
    const header = new HttpHeaders().set('Authorization',`Bearer ${this.authToken}`)
    let response!:any;
    try{
      response= await lastValueFrom(this.http.get(`http://localhost:3000/user/${problemId}`,{headers: header}))
    }catch(e){
      console.log('error::::',e);
    }
    return {creator:response.user, userProblems:response.userProblems}

  }
  
  async login(userLogin:any):Promise<User>{
    let user!:User;
    user = await lastValueFrom(this.http.post<User>('http://localhost:3000/login',userLogin))
    this.authToken = user.token;
    console.log("You are successfully Logged In!")
    return user
  }

}
