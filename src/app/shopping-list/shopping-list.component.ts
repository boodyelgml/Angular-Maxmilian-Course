import { ingredients } from './ingredients.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { shoppingServices } from './shopping.services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
})

export class ShoppingListComponent implements OnInit, OnDestroy {
  editingMode: boolean = false;
  ingredients: ingredients[];
  onIngredientsChangedSubscription: Subscription;
  editModeSubs: Subscription;

  constructor(private shoppingServices: shoppingServices) { }

  ngOnInit(): void {
    this.editModeSubs = this.shoppingServices.editMode.subscribe(
      (mode: boolean) => {
        this.editingMode = mode;
      }
    );
    this.ingredients = this.shoppingServices.getIngredients();
    this.onIngredientsChangedSubscription = this.shoppingServices.onIngredientsChanged.subscribe(
      (Ingredient: ingredients[]) =>
        this.ingredients = Ingredient
    )
  }
  onEditItem(index: number) {
    this.shoppingServices.onEditItem.next(index);
    this.shoppingServices.editModeActive(true); 
  }
  onDelete(index: number) {
    this.shoppingServices.onDeleteIngredient(index);
  }

  ngOnDestroy() {
    this.onIngredientsChangedSubscription.unsubscribe();
    this.editModeSubs.unsubscribe();
  }
}
