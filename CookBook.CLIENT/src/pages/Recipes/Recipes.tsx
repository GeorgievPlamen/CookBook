import { Recipe } from "../../models/Recipe";
import RecipeCard from "../../components/RecipeCard";
import { useEffect, useState } from "react";
import { api } from "../../api/CookBookApi";
import { AxiosError } from "axios";

export default function Recipes() {
  const [error, setError] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>();

  useEffect(() => {
    api.recipes
      .getAll()
      .then((x) => setRecipes(x))
      .catch((err) => {
        const axiosErr = err as AxiosError;
        setError(`${axiosErr.message} ${axiosErr.response?.statusText}`);
      });
  }, []);
  return (
    <section className="w-2/3 rounded-lg border px-4 py-2 shadow-md shadow-slate-500">
      <h2 className="mb-2 text-center text-2xl font-bold">Recipes</h2>
      {error.length > 0 ? (
        <p className="text-center font-bold text-red-600">{error}</p>
      ) : null}
      {recipes && (
        <div className="grid grid-cols-4 gap-4">
          {recipes.map((r) => (
            <RecipeCard recipe={r} key={r.id} />
          ))}
        </div>
      )}
    </section>
  );
}
