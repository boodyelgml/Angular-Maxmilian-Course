import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { appRouting } from './app.routing.module';
import { authInterceptorService } from './auth/auth-interceptor-services';

import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { recipesModule } from './recipes/module-routing/recipes.module';
 import { dataStorageService } from './shared/data_storage.services';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { shoppingServices } from './shopping-list/shopping.services';
import { SpinnerComponent } from './spinner/spinner.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    AuthComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    appRouting,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    recipesModule
  ],
  providers: [shoppingServices, dataStorageService, { provide: HTTP_INTERCEPTORS, useClass: authInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
