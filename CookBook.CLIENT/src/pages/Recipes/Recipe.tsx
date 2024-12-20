import { useContext } from "react";
import { AppContext } from "../../layout/Layout";
import { MapToRecipeType } from "./RecipeTypes";
import { api } from "../../api/CookBookApi";
import { useNavigate } from "react-router-dom";

export default function Recipe() {
  const { recipe } = useContext(AppContext);
  const nav = useNavigate();

  if (!recipe) return <p>Something went wrong</p>;

  function handleDelete() {
    if (recipe?.id) {
      api.recipes.delete(recipe.id);
      nav("/");
    }
  }

  return (
    <article className="w-2/3 rounded-lg border px-4 py-2 shadow-md shadow-slate-500">
      <section className="flex items-center justify-around">
        <div>
          <h2 className="text-se mb-2 text-center text-2xl font-bold">
            {recipe.name}
          </h2>
          <h4>By: {recipe.cook?.name ?? "Unknown"}</h4>
        </div>
        <div className="flex flex-col items-center">
          <img
            className="h-64 rounded-2xl object-cover"
            alt="bolonese"
            src={recipe.imageBase64}
          />
          <button
            className="my-1 w-1/2 rounded-lg bg-red-600 py-1 text-white"
            type="submit"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </section>
      <section className="mb-4 mt-2 rounded-lg p-2">
        <h4 className="text-lg font-semibold text-lime-600">
          Time to prepare:{" "}
          <span className="font-normal text-black">{recipe.timeToPrepare}</span>
        </h4>
        <h4 className="text-lg font-semibold text-lime-600">
          Type:{" "}
          <span className="font-normal text-black">
            {MapToRecipeType(recipe.type)}
          </span>
        </h4>
      </section>
      <section className="mb-4 mt-2 rounded-lg p-2">
        <h4 className="text-lg font-semibold text-lime-600">Ingredients:</h4>
        <div className="flex gap-3 p-4">
          {recipe.ingredients.map((i) => (
            <p key={i.id}>{i.name}</p>
          ))}
        </div>
      </section>
      <section className="mb-4 mt-2 rounded-lg p-2">
        <h4 className="text-lg font-semibold text-lime-600">
          How to prepare:{" "}
        </h4>
        <p className="p-4">{recipe.instructions}</p>
      </section>
    </article>
  );
}
