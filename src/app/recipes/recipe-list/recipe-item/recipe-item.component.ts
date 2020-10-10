import { recipeService } from './../../recipe.services';
import { recipe } from './../../recipe.model';
  import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {


  @Input() recipe:recipe ;
  constructor(private RecipeService:recipeService) { }

  ngOnInit(): void {
  }

  onItemClick(){
      this.RecipeService.onItemClickViewDetails.emit(this.recipe);
  }
}
