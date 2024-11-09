export enum RecipeTypes  {
    Breakfast="Breakfast",
    Brunch="Brunch",
    Lunch="Lunch",
    Tea="Tea",
    Supper="Supper",
    Dinner="Dinner"
}

export function MapToRecipeType(number: number) {
    switch (number){
        case 0: return RecipeTypes.Breakfast;
        case 1: return RecipeTypes.Brunch;
        case 2: return RecipeTypes.Lunch;
        case 3: return RecipeTypes.Tea;
        case 4: return RecipeTypes.Supper;
        case 5: return RecipeTypes.Dinner;
    }
}

export function MapFromRecipeType(number: RecipeTypes) {
    switch (number){
        case RecipeTypes.Breakfast: return 0
        case RecipeTypes.Brunch: return 1
        case RecipeTypes.Lunch: return 2
        case RecipeTypes.Tea: return 3
        case RecipeTypes.Supper: return 4
        case RecipeTypes.Dinner: return 5
    }
}