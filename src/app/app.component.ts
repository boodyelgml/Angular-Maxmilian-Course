import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  defaultView = "recipe";

  viewSelected(view:string){
    this.defaultView = view;
  }

  directToShoppingList(shoppingListView){
    this.defaultView = shoppingListView;
  }
}
