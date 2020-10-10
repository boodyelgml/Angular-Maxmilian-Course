import { shoppingServices } from './../shopping-list/shopping.services';
import { ingredients } from './../shopping-list/ingredients.model';
import { EventEmitter, Injectable } from '@angular/core';
import { ingredients } from '../shopping-list/ingredients.model';
import { recipe } from './recipe.model';
@Injectable()
export class recipeService {

  constructor(private shoppingServices:shoppingServices){}

  onItemClickViewDetails = new EventEmitter<recipe>();

  private recipes: recipe[] = [
    new recipe('name test', 'description test', 'https://via.placeholder.com/300/09f/fff.png',[
      new ingredients('hello' , 5),
      new ingredients('world' , 5)
    ]),
    new recipe('name test2', 'description test2', 'https://via.placeholder.com/300/09f/fff.png',
    [
      new ingredients('banana' , 5),
      new ingredients('ice' , 5)
    ])
  ];

  getRecipes(){
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients:ingredients[]){
    this.shoppingServices.addIngredientsToShopping(ingredients);
    }
}
