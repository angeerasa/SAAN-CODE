import { Component, OnInit } from '@angular/core';
import { Data, Router, RouterModule } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public service:DataService, private router:Router) { }
  ngOnInit(): void {}

}
