import { Recipe } from "./Recipe";

export interface Cook {
    id: string;
    name: string;
    email: string;
    recipes: Recipe[];
}
