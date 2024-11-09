import { Cook } from "./Cook";
  
export interface Recipe {
  id: string;
  name: string;
  instructions: string;
  ingredients: {
    id: string;
    name: string;
  }[];
  type: number;
  timeToPrepare: string;
  cook?: Cook;
  imageBase64?: string;
}