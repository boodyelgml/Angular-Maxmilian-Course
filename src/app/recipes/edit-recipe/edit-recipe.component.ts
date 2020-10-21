import { recipeService } from './../recipe.services';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, } from '@angular/forms';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {

  id: number;
  recipeForm: FormGroup;
  editMode = false;
  constructor(private route: ActivatedRoute, private recipeService: recipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        if (params['id']) {
          this.id = params['id'];
          this.editMode = this.id !== null;
          this.formInit();
        }
        this.formInit();
      }
    )
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(),
        'amount': new FormControl(),
      })
    )
  }
  onDeleteIngredient(i: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(i);
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      console.log('edit mode off');
      this.recipeService.addRecipe(this.recipeForm.value)
    }
  }

  formInit() {

    let recipeName = '';
    let recipePath = '';
    let recipeDescription = '';
    let ingArray = new FormArray([]);

    if (this.editMode) {

      const recipe = this.recipeService.getRecipeById(this.id);

      recipeName = recipe.name;
      recipePath = recipe.url;
      recipeDescription = recipe.description;

      if (recipe.ingredients) {
        (recipe.ingredients).forEach(ingredient => {
          ingArray.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern('^[1-9]\d*$')]),
            })
          )
        });
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'url': new FormControl(recipePath, Validators.required),
      'ingredients': ingArray
    })
  }



}
