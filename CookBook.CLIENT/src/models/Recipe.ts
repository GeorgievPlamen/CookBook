import { Cook } from "./Cook";
import { Ingredient } from "./Ingredient";
  
export interface Recipe {
  id: string;
  name: string;
  instructions: string;
  ingredients: Ingredient[];
  type: number;
  timeToPrepare: string;
  cook?: Cook;
  imageBase64?: string;
}