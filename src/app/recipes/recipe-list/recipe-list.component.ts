import { recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes :recipe[]= [
    new recipe('name test' , 'description test' , 'https://via.placeholder.com/300/09f/fff.png'),
    new recipe('name test2' , 'description test2' , 'https://via.placeholder.com/300/09f/fff.png')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
