import { dataStorageService } from './../shared/data_storage.services';
import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.services'
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy{
   isAuth:boolean;
  constructor(private dataStorageService: dataStorageService, private AuthService: AuthService) {}
     subs = this.AuthService.isAuth.subscribe(isAuth => {
      this.isAuth = isAuth;
    });  
  
  ngOnInit(){
   }

  onlogout (){
    this.isAuth = false;
    this.AuthService.logout();
  }
  saveData(){
    this.dataStorageService.storeRecipes();
  }
  fetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }
   ngOnDestroy(){
     this.subs.unsubscribe()
   }
}
