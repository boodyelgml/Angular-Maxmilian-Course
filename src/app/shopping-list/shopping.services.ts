import { EventEmitter } from '@angular/core';
import { ingredients } from './ingredients.model';


export class shoppingServices {

  onAddNewShoppingListItem = new EventEmitter<ingredients>();
  onIngredientsChanged = new EventEmitter<ingredients[]>();

  private ingredients: ingredients[] = [
    new ingredients('Apples', 4),
    new ingredients('Tomattos', 5)
  ];

  getIngredients() {
    return this.ingredients.slice()
  }

  addIngredient(ingredient: ingredients) {
    this.ingredients.push(ingredient);
    this.onIngredientsChanged.emit(this.ingredients.slice())
  }

  addIngredientsToShopping(ingredients: ingredients[]) {
    this.ingredients.push(...ingredients);
  }
}
