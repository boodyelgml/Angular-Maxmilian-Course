import { recipe } from './../recipes/recipe.model';
import { recipeService } from './../recipes/recipe.services';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';



@Injectable()
export class dataStorageService {
    constructor(private http: HttpClient, private recipeService: recipeService) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        return this.http.put('https://recipe-app-25c8b.firebaseio.com/recipes.json', recipes).subscribe(
            (res) => {
                console.log(res);
            }
        )
    }

    fetchRecipes() {
        return this.http
        .get<recipe[]>('https://recipe-app-25c8b.firebaseio.com/recipes.json')
        .pipe(map(recipe => {
                return recipe.map(recipe => {
                    return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
                })
            }),
            tap(recipes => {
                return this.recipeService.setRecipes(recipes);
            })
            )
    }
    
    
}