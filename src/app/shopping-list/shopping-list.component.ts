import { ingredients } from './ingredients.model';
import { Component, OnInit } from '@angular/core';
import { shoppingServices } from './shopping.services';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  })
export class ShoppingListComponent implements OnInit {

  ingredients:ingredients[];

  constructor(private shoppingServices:shoppingServices) { }

  ngOnInit(): void {

    this.ingredients = this.shoppingServices.getIngredients();

    this.shoppingServices.onIngredientsChanged.subscribe(
      (Ingredient : ingredients[])=>
        this.ingredients = Ingredient
    )
  }

}
