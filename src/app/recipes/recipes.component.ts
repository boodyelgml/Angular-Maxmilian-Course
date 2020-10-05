import { recipe } from './recipe.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  constructor() { }

  recipeWasSelected :recipe;
  @Output() shoppingListView = new EventEmitter<string>();

  PassToAppComponent(view){
    this.shoppingListView.emit(view);
  }

  ngOnInit(): void {
  }

}
