import { Cook } from "./Cook";
import { Ingredient } from "./Ingredient";
  
export interface Recipe {
  id?: string;
  name: string;
  instructions: string;
  ingredients: Ingredient[];
  type: number;
  timeToPrepare: string;
  cook?: Cook;
  imageBase64?: string;
}

export interface PaginatedRecipe {
  recipes: Recipe[],
  totalCount: number,
  hasNextPage: boolean,
  hasPreviousPage: boolean
}

export interface CreateRecipe {
  name: string;
  ingredientIds: string[];
  instructions: string;
  timeToPrepare: string;
  type: number;
  imageBase64: string;
}