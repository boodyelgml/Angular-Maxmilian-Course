import { Subject } from 'rxjs';
import { ingredients } from './ingredients.model';

export class shoppingServices {

  onIngredientsChanged = new Subject<ingredients[]>();

  private ingredients: ingredients[] = [
    new ingredients('Apples', 4),
    new ingredients('Tomattos', 5)
  ];

  getIngredients() {
    return this.ingredients.slice()
  }

  addIngredient(ingredient: ingredients) {
    this.ingredients.push(ingredient);
    this.onIngredientsChanged.next(this.ingredients.slice())
  }

  addIngredientsToShopping(ingredients: ingredients[]) {
    this.ingredients.push(...ingredients);
    this.onIngredientsChanged.next(this.ingredients.slice())
  }
}
