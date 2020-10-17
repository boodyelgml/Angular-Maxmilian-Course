import { ingredients } from './ingredients.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { shoppingServices } from './shopping.services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
})

export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: ingredients[];
  onIngredientsChangedSubscription: Subscription;

  constructor(private shoppingServices: shoppingServices) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingServices.getIngredients();
    this.onIngredientsChangedSubscription = this.shoppingServices.onIngredientsChanged.subscribe(
      (Ingredient: ingredients[]) =>
        this.ingredients = Ingredient
    )
  }

  ngOnDestroy() {
    this.onIngredientsChangedSubscription.unsubscribe();
  }
}
