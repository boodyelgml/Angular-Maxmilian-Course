import { recipeResolver } from './shared/recipe_resolver.services';
import { dataStorageService } from './shared/data_storage.services';
import { recipeService } from './recipes/recipe.services';
import { appRouting } from './app.routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { shoppingServices } from './shopping-list/shopping.services';
import { StartRecipeComponent } from './recipes/start-recipe/start-recipe.component';
import { EditRecipeComponent } from './recipes/edit-recipe/edit-recipe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    RecipeItemComponent,
    StartRecipeComponent,
    EditRecipeComponent,
    AuthComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    appRouting,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [shoppingServices, recipeService , dataStorageService , recipeResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
