import { ingredients } from 'src/app/shopping-list/services-models/ingredients.model';
export class recipe{
  constructor(public name:string , public description:string, public url:string, public ingredients:ingredients[]){

  }
}
