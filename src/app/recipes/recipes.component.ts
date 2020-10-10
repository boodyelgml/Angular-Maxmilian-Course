import { recipeService } from './recipe.services';
import { recipe } from './recipe.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers:[recipeService]
})
export class RecipesComponent implements OnInit {

  constructor(private RecipeService:recipeService) { }

  recipeWasSelected :recipe;
  @Output() shoppingListView = new EventEmitter<string>();

  PassToAppComponent(view){
    this.shoppingListView.emit(view);
  }

  ngOnInit(): void {
    this.RecipeService.onItemClickViewDetails.subscribe(
      (recipe:recipe)=>
      this.recipeWasSelected = recipe
    )
  }

}
