import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
 import { ReactiveFormsModule, FormsModule } from '@angular/forms';
 import { CommonModule } from '@angular/common';
import { recipeRoutnigModule } from './recipe-routing.module';
import { RecipesComponent } from '../recipes.component';
import { RecipeDetailComponent } from '../recipe-detail/recipe-detail.component';
import { RecipeListComponent } from '../recipe-list/recipe-list.component';
import { RecipeItemComponent } from '../recipe-list/recipe-item/recipe-item.component';
import { StartRecipeComponent } from '../start-recipe/start-recipe.component';
import { EditRecipeComponent } from '../edit-recipe/edit-recipe.component';
import { recipeService } from '../services-models/recipe.services';
import { recipeResolver } from '../../shared/recipe_resolver.services';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    RecipeItemComponent, 
    StartRecipeComponent,
    EditRecipeComponent
  ],
    providers: [recipeService, recipeResolver],
    imports: [RouterModule, CommonModule, ReactiveFormsModule, FormsModule, recipeRoutnigModule],
  exports: []
})

export class recipesModule {}
