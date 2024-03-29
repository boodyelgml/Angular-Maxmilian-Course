import { Subject } from 'rxjs';
import { ingredients } from 'src/app/shopping-list/services-models/ingredients.model';
import { shoppingServices } from 'src/app/shopping-list/services-models/shopping.services';

import { EventEmitter, Injectable } from '@angular/core';
import { recipe } from './recipe.model';
@Injectable()
export class recipeService {

  recipeChanged = new Subject<recipe[]>();

  constructor(private shoppingServices: shoppingServices) { }

  private recipes: recipe[] = [];

 
  setRecipes(recipe:recipe[]){
    this.recipes = recipe;   
    this.recipeChanged.next(this.recipes.slice());
  }
  
  addRecipe(recipe: recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }


  deleteRecipe(index:number){
    this.recipes.splice(index,1);
    this.recipeChanged.next(this.recipes.slice()); 
  }


  updateRecipe(index: number, newRecipe: recipe) {
     this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }


  getRecipeById(id: number) {
    return this.recipes[id];
  }


  addIngredientsToShoppingList(ingredients: ingredients[]) {
    this.shoppingServices.addIngredientsToShopping(ingredients);
  }
}
