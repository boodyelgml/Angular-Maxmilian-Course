import { NgModule } from '@angular/core';
import { ShoppingEditComponent } from '../shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from '../shopping-list.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
  
const router: Routes = [  
  { path: 'shopping-list', component: ShoppingListComponent },
]
@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports: [CommonModule, FormsModule, RouterModule.forChild(router)],
  exports: [RouterModule]
})
export class shoppingModule {}
