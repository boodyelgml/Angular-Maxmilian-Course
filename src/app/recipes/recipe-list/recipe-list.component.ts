import { recipeService } from './../recipe.services';
import { recipe } from './../recipe.model';
import { Component, OnInit, Output  } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  public recipes: recipe[];


  constructor(private RecipeService : recipeService) { }

  ngOnInit() {
    this.recipes =  this.RecipeService.getRecipes();
  }

}
