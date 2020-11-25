import { AuthService } from './auth/auth.services';
 import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{ 
  
  constructor(private AuthService:AuthService) {
  }
  ngOnInit(){ 
     this.AuthService.autoLogin();
   }
}
