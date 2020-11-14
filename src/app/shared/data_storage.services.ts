import { Params } from '@angular/router';
import { AuthService } from './../auth/auth.services';
import { recipe } from './../recipes/recipe.model';
import { recipeService } from './../recipes/recipe.services';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';



@Injectable()
export class dataStorageService {
    constructor(private http: HttpClient, private recipeService: recipeService, private AuthService: AuthService) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        return this.http.put('https://recipe-app-25c8b.firebaseio.com/recipes.json', recipes).subscribe(
            (res) => {
                alert(res);
            }
        )
    }

    fetchRecipes() {
        return this.http
            .get<recipe[]>('https://recipe-app-25c8b.firebaseio.com/recipes.json', 
            {
                params:new HttpParams().set('auth',localStorage['token']),
            })
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