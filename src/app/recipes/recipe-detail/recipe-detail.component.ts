 import { Component, OnInit, Output, EventEmitter } from '@angular/core';
 @Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  constructor() { }
  @Output() directToShoppingList = new EventEmitter<string>();
  toShoppingList(shoppingListView){
    this.directToShoppingList.emit(shoppingListView);
   }
  ngOnInit(): void {
  }

}
