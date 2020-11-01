import { dataStorageService } from './../shared/data_storage.services';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dataStorageService:dataStorageService) { }

   ngOnInit(): void {
  }

  saveData(){
    this.dataStorageService.storeRecipes();
  }
  fetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
