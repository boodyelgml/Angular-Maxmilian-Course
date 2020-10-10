import { ingredients } from './../shopping-list/ingredients.model';
export class recipe{
  constructor(public name:string , public description:string, public url:string, public ingredients:ingredients[]){

  }
}
