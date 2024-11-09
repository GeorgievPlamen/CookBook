import { useContext } from "react";
import { AppContext } from "../../layout/Layout";
import { MapToRecipeType } from "./RecipeTypes";

export default function Recipe() {
  const { recipe } = useContext(AppContext);

  console.log(recipe);
  if (!recipe) return <p>Something went wrong</p>;

  return (
    <article className="w-2/3 rounded-lg border px-4 py-2 shadow-md shadow-slate-500">
      <section className="flex items-center justify-around">
        <div>
          <h2 className="text-se mb-2 text-center text-2xl font-bold">
            {recipe.name}
          </h2>
          <h4>By: {recipe.cook?.name ?? "Unknown"}</h4>
        </div>
        <img
          className="h-64 rounded-2xl object-cover"
          alt="bolonese"
          src={recipe.imageBase64}
        />
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
