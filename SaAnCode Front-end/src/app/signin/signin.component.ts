import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Login, User } from '../services/interfaces/login.interface'
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  UserName!: String
  Password!: String;
  userProfile!: User
  http!: HttpClient;
  constructor(public service:DataService, private router:Router) { }

  ngOnInit(): void {
  }
  async SignIn(){
    let credential={
      email: this.UserName,
    password: this.Password
    }
    this.userProfile = await this.service.login(credential)
    setTimeout(()=>{
      this.router.navigate(['/profile']);

    },1000)
  }
}
