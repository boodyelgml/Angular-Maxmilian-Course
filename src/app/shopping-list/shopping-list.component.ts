import { ingredients } from './ingredients.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients:ingredients[] = [
    new ingredients('Apples' , 4),
    new ingredients('Tomattos' , 5)
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
