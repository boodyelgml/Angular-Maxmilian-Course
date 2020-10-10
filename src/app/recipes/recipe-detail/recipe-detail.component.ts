import { recipeService } from './../recipe.services';
import { recipe } from './../recipe.model';
 import { Component, OnInit,  Input } from '@angular/core';
 @Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() Recipe:recipe;

  constructor(private RecipeService:recipeService) { }

  toShoppingList(){
    this.RecipeService.addIngredientsToShoppingList(this.Recipe.ingredients)
  }
  ngOnInit(): void {
  }

}
