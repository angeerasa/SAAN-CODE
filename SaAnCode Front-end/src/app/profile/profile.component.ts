import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { User } from '../services/interfaces/login.interface';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile!: any
  edit_profile:boolean = false
  constructor(public service: DataService) { 
    this.service.getProfile().subscribe(
      (res:User)=>{
        this.profile= res;
      }
    );
  }

  ngOnInit(): void {
  }
  async updateProfile(){
    let response = await this.service.updateUserProfile(this.profile);
    // console.log(response);
  }
  
}
