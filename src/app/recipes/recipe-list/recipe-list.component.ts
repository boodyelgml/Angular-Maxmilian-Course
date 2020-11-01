import { Subscription } from 'rxjs';
import { recipeService } from './../recipe.services';
import { recipe } from './../recipe.model';
import { Component, OnInit, Output, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  public recipes: recipe[];
  Subscription: Subscription;
  constructor(private RecipeService: recipeService) { }

  ngOnInit() {

    this.Subscription = this.RecipeService.recipeChanged.subscribe
      (
        (recipe: recipe[]) => {
          this.recipes = recipe;
        }
      )
    this.recipes = this.RecipeService.getRecipes();
  }
  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }

}
