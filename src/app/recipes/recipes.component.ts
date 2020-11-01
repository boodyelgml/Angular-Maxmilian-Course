import { dataStorageService } from './../shared/data_storage.services';
import { recipeService } from './recipe.services';
 
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'] 
})
export class RecipesComponent implements OnInit {

  constructor(private dataStorageService:dataStorageService) {
     this.dataStorageService.fetchRecipes().subscribe();

   }

  ngOnInit(): void { }

}
