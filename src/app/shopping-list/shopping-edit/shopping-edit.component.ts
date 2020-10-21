import { Subscription } from 'rxjs';
import { ingredients } from './../ingredients.model';
import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter, OnDestroy } from '@angular/core';
import { shoppingServices } from '../shopping.services';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') editForm: NgForm;
  Subscription: Subscription;
  ModeSubs: Subscription;
  editIngredientIndex: number;
  editingIngredient: ingredients;
  editingMode: boolean;
  
  constructor(private shoppingListService: shoppingServices) { }

  ngOnInit(): void {
//subscripe changes on edit mode
    this.ModeSubs = this.shoppingListService.editMode.subscribe(
      (mode: boolean) => {
        this.editingMode = mode;
      }
    );

    //subscripe selected ingredient to set its value to form inputs
    this.Subscription = this.shoppingListService.onEditItem.subscribe(
      (index: number) => {
        this.editIngredientIndex = index;
        this.shoppingListService.editModeActive(true);
        this.editingIngredient = this.shoppingListService.getIngredient(index);
        this.editForm.setValue({
          name: this.editingIngredient.name,
          amount: this.editingIngredient.amount,
        })

      }
    )
  }

  //start add new ingredients to ingredients list
  addToShoppingLsit(form: NgForm) {
    const formValue = form.value;
    const newIngredient = new ingredients(formValue.name, formValue.amount);
    if (this.editingMode) {
      this.shoppingListService.updateIngredient(this.editIngredientIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    } 
    //switch edit mode to => false
    this.shoppingListService.editModeActive(false);
    form.reset();
  }

  //start clear form 
  onClear(form: NgForm) {
    //switch edit mode to => false
    this.shoppingListService.editModeActive(false);
    form.reset();
  }

  //when component destroied
  ngOnDestroy(): void {
    this.Subscription.unsubscribe();
    this.ModeSubs.unsubscribe();
  }
}
