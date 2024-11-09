import { useNavigate } from "react-router-dom";
import { Recipe } from "../models/Recipe";
import { useContext } from "react";
import { AppContext } from "../layout/Layout";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const nav = useNavigate();
  const { setRecipe } = useContext(AppContext);

  return (
    <article
      onClick={() => {
        nav(`/${recipe.id}`);
        if (setRecipe) setRecipe(recipe);
      }}
      className="rounded-2xl border shadow"
    >
      <img
        className="h-40 rounded-t-2xl object-cover"
        alt="bolonese"
        src={recipe.imageBase64}
      />
      <p className="my-2 text-center font-bold">{recipe.name}</p>
    </article>
  );
}
