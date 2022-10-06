import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  email!:string;
  name!:string;
  password!:string;
  age:number | undefined // field not mandatory
  occupation:string | undefined; // field not mandatory
  constructor(private service: DataService) { }

  ngOnInit(): void {
  }

  async signUp(){
    let user = {
      email: this.email,
      name:this.name,
      password:this.password,
      age: this.age,
      occupation:this.occupation
    }
    try
    {
      let res = await this.service.registerUser(user);
      console.log("User Created");
      console.log(res)
    }catch(e){
      console.log("error");
      console.log(e);
    }
  }

}
