import { Subject } from 'rxjs';
import { shoppingServices } from './../shopping-list/shopping.services';
import { ingredients } from './../shopping-list/ingredients.model';
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
    console.log(this.recipes[index]);
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
