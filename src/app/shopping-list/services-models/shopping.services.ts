import { Subject } from 'rxjs';
import { ingredients } from './ingredients.model';

export class shoppingServices {

  onIngredientsChanged = new Subject<ingredients[]>();
  onEditItem = new Subject<number>();
  editMode = new Subject<boolean>();

  editModeActive(mode: boolean) {
    this.editMode.next(mode);
  }

  private ingredients: ingredients[] = [
    new ingredients('Apples', 4),
    new ingredients('Tomattos', 5)
  ];

  getIngredients() {
    return this.ingredients.slice()
  }
  getIngredient(index: number) {
    return this.ingredients[index]
  }
  onDeleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.onIngredientsChanged.next(this.ingredients.slice())

  };
  updateIngredient(index: number, ingredient: ingredients) {
    this.ingredients[index] = ingredient;
    this.onIngredientsChanged.next(this.ingredients.slice())
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
