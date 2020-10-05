import { recipe } from './../../recipe.model';
  import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Output() recipePassed = new EventEmitter<void>();

  @Input() recipe:recipe ;
  constructor() { }

  ngOnInit(): void {
  }

  passItemView(){
    this.recipePassed.emit();
  }
}
