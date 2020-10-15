import { ingredients } from './../ingredients.model';
import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { shoppingServices } from '../shopping.services';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
 })
export class ShoppingEditComponent implements OnInit {

  @ViewChild('itemName') itemNameRef: ElementRef;
  @ViewChild('itemAmount') itemAmountRef: ElementRef;

   constructor(private shoppingListService:shoppingServices) { }

  ngOnInit(): void {
  }
  addToShoppingLsit() {
    const itemName = this.itemNameRef.nativeElement.value;
    const itemAmount = this.itemAmountRef.nativeElement.value;
    const ing = new ingredients(itemName , itemAmount);
    this.shoppingListService.addIngredient(ing);
  }
}
