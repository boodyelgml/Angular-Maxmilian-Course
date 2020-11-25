import { ingredients } from './services-models/ingredients.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { shoppingServices } from './services-models/shopping.services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
})

export class ShoppingListComponent implements OnInit, OnDestroy {

  //ingredients 
  ingredients: ingredients[];
  onIngredientsChangedSubscription: Subscription;

  //modes
  editingMode: boolean = false;
  editModeSubs: Subscription;

  constructor(private shoppingServices: shoppingServices) { }

  ngOnInit(): void {

    //get all ingredients from the service
    this.ingredients = this.shoppingServices.getIngredients();

    //subscripe changes on edit mode
    this.editModeSubs = this.shoppingServices.editMode.subscribe(
      (mode: boolean) => {
        this.editingMode = mode;
      }
    );

    //subscribe changes on ingredients list
    this.onIngredientsChangedSubscription = this.shoppingServices.onIngredientsChanged.subscribe(
      (Ingredient: ingredients[]) =>
        this.ingredients = Ingredient
    )
  }

  //start edit ingredient
  onEditItem(index: number) {
    //send index of the ingredients to the service
    this.shoppingServices.onEditItem.next(index);
    //switch edit mode to => true 
    this.shoppingServices.editModeActive(true);
  }

  //start deleteing ingredients
  onDelete(index: number) {
    //send index of the ingredients to the service 
    this.shoppingServices.onDeleteIngredient(index);
  }

  //when compomnent destroied
  ngOnDestroy() {
    this.onIngredientsChangedSubscription.unsubscribe();
    this.editModeSubs.unsubscribe();
  }
}
