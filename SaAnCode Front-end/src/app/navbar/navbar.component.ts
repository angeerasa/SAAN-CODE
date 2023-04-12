import { Component, OnInit, DoCheck } from '@angular/core';
import { Data, Router, RouterModule } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements DoCheck{
  loggedIn:boolean = false;
  constructor(public service:DataService, public router:Router){ 
  }

  ngDoCheck(){
    if(!this.service.authToken){
      this.loggedIn=false;
    }else{
      this.loggedIn = true
    }
  }

  onLogout(){
    this.service.logout();
    this.loggedIn=false;
    this.router.navigate(['/'])
  }
}