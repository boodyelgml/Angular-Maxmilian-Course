import { recipe } from './../recipe.model';
 import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
 @Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() Recipe:recipe;

  constructor() { }
  @Output() directToShoppingList = new EventEmitter<string>();
  toShoppingList(shoppingListView){
    this.directToShoppingList.emit(shoppingListView);
   }
  ngOnInit(): void {
  }

}
