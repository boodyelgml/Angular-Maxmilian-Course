import { recipeService } from './../services-models/recipe.services';
import { recipe } from './../services-models/recipe.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  Recipe: recipe;
  id: number;
  constructor(private RecipeService: recipeService, private route: ActivatedRoute,private router: Router) { }


  toShoppingList() {
    this.RecipeService.addIngredientsToShoppingList(this.Recipe.ingredients)
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id']
        this.Recipe = this.RecipeService.getRecipeById(this.id)
      }
    )
  }

  onDelete(){
    this.RecipeService.deleteRecipe(this.id);
    this.router.navigate(['../'] , {relativeTo:this.route});
  }
  

}
