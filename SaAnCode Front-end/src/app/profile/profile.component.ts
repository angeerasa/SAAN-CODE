import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { User } from '../services/interfaces/login.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile!: any
  constructor(private service: DataService) { 
    this.service.getProfile().subscribe(
      (res:User)=>{
        this.profile= res;
      }
    );
  }

  ngOnInit(): void {
    
  }

}
