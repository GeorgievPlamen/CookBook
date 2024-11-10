import { Recipe } from "../../models/Recipe";
import RecipeCard from "../../components/RecipeCard";
import { useEffect, useState } from "react";
import { api } from "../../api/CookBookApi";
import { AxiosError } from "axios";

export default function Recipes() {
  const [error, setError] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>();
  const PAGE_SIZE = 8;

  useEffect(() => {
    api.recipes
      .getAll(page, PAGE_SIZE)
      .then((x) => {
        setRecipes([...recipes, ...x.recipes]);
        setHasNextPage(x.hasNextPage);
      })
      .catch((err) => {
        const axiosErr = err as AxiosError;
        setError(`${axiosErr.message} ${axiosErr.response?.statusText}`);
      });
  }, [page]);

  useEffect(() => SearchRecipes, [searchTerm]);

  function SearchRecipes() {
    api.recipes
      .getAll(1, PAGE_SIZE, searchTerm)
      .then((x) => {
        setRecipes(x.recipes);
        setHasNextPage(x.hasNextPage);
      })
      .catch((err) => {
        const axiosErr = err as AxiosError;
        setError(`${axiosErr.message} ${axiosErr.response?.statusText}`);
      });
  }

  return (
    <section className="flex w-2/3 flex-col items-center justify-center rounded-lg border px-4 py-2 shadow-md shadow-slate-500">
      <h2 className="mb-2 text-center text-2xl font-bold">Recipes</h2>
      <div className="mb-2 flex flex-row">
        <label htmlFor="email">Search</label>
        <input
          className="ml-2 rounded-lg border-2"
          type="email"
          name="email"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
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
      {hasNextPage && (
        <button
          onClick={() => setPage(page + 1)}
          className="my-auto mt-4 w-1/3 rounded-lg bg-background py-1 text-white"
        >
          Load more
        </button>
      )}
    </section>
  );
}
