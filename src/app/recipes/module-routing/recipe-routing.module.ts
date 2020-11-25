import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
 
import { RecipeDetailComponent } from '../recipe-detail/recipe-detail.component';
import { RecipesComponent } from '../recipes.component';
import { authGuard } from '../../auth/auth.guard';
import { StartRecipeComponent } from '../start-recipe/start-recipe.component';
import { EditRecipeComponent } from '../edit-recipe/edit-recipe.component';
import { recipeResolver } from '../../shared/recipe_resolver.services';

const routes: Routes = [
    {
        path: 'recipes', component: RecipesComponent, canActivate: [authGuard], children: [
            { path: '', component: StartRecipeComponent },
            { path: 'new', component: EditRecipeComponent },
            { path: ':id', component: RecipeDetailComponent, resolve: [recipeResolver] },
            { path: ':id/edit', component: EditRecipeComponent, resolve: [recipeResolver] },
        ]
    },
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class recipeRoutnigModule { }
