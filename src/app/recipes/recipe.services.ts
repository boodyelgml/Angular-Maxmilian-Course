import { shoppingServices } from './../shopping-list/shopping.services';
import { ingredients } from './../shopping-list/ingredients.model';
import { EventEmitter, Injectable } from '@angular/core';
 import { recipe } from './recipe.model';
@Injectable()
export class recipeService {

  constructor(private shoppingServices:shoppingServices){}


  private recipes: recipe[] = [
    new recipe('Spagetti', 'spagetti is a famous egyptian recipe which every newly married peoples eats everyday', 'https://image.shutterstock.com/image-photo/fresh-delicious-spagetti-bolognese-260nw-1170034021.jpg',[
      new ingredients('makarona' , 1),
      new ingredients('tomatto salsa' , 5)
    ]),
    new recipe('Mahshi', 'mahshi is the most famous recipe ever at egypt', 'https://www.justfood.tv/nawa3emPics/000%20(7)-8.jpg',
    [
      new ingredients('Rise' , 5),
      new ingredients('wara2 3enab' , 5)
    ])
  ];

  getRecipes(){
    return this.recipes.slice();
  }
  getRecipeById(id){
    return this.recipes[id];
  }
  addIngredientsToShoppingList(ingredients:ingredients[]){
    this.shoppingServices.addIngredientsToShopping(ingredients);
    }
}
