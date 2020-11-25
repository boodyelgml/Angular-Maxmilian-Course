import { recipeService } from './../recipes/services-models/recipe.services';
import { dataStorageService } from './data_storage.services';
import { Injectable } from '@angular/core';
import { recipe } from './../recipes/services-models/recipe.model';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class recipeResolver implements Resolve<recipe[]>{

  constructor(private recipeService: recipeService, private dataStorageService: dataStorageService) {}

  resolve(Router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes();
    if (recipes.length === 0) {
      return this.dataStorageService.fetchRecipes();
    } else {
      return recipes;
    }
  }
}
