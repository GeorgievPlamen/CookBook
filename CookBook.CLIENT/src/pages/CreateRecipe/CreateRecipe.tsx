import { useState } from "react";
import { Ingredient } from "../../models/Ingredient";

export default function CreateRecipe() {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState<unknown>();
  const [timeToPrepare, setTimeToPrepare] = useState(60);
  const [howToPrepare, setHowToPrepare] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [addedIngredients, setAddedIngredients] = useState<Ingredient[]>([]);

  console.log(file);

  return (
    <section className="w-2/4 justify-center rounded-lg border px-4 py-2 shadow-md shadow-slate-500">
      <h2 className="mb-2 text-center text-2xl font-bold">Create Recipe</h2>
      <div className="mx-auto mb-2 flex w-2/3 flex-col">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          className="rounded-lg border-2 py-1"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mx-auto mb-2 flex w-2/3 flex-col">
        <label htmlFor="uploadimage">Upload Image</label>
        <input
          type="file"
          name="uploadimage"
          className="rounded-lg border-2 py-1"
          onChange={(e) => setFile(e.target.files![0])}
        />
      </div>
      <div className="mx-auto mb-2 flex w-2/3 flex-col">
        <label htmlFor="timetoprepare">
          Time to prepare: {timeToPrepare} minutes
        </label>
        <input
          type="range"
          min={1}
          max={240}
          name="timetoprepare"
          className="rounded-lg border-2 py-1"
          onChange={(e) =>
            setTimeToPrepare(e.target.value as unknown as number)
          }
        />
      </div>
      <div className="mx-auto mb-2 flex w-2/3 flex-col">
        <label htmlFor="howtoprepare">How to prepare</label>
        <textarea
          name="howtoprepare"
          className="rounded-lg border-2"
          onChange={(e) => setHowToPrepare(e.target.value)}
        />
      </div>
      <div className="mx-auto mb-2 flex w-2/3 flex-col">
        <label htmlFor="ingredients">Ingredients</label>
        <div>
          <select
            onChange={(e) => setSelectedIngredient(e.target.value)}
            name="ingredients"
            className="w-5/6 rounded-lg border-2 py-1"
          >
            <option hidden>Choose</option>
            <option value={"asdf"}>Tomato</option>
            <option value={"asdffsdaf"}>Egg</option>
          </select>
          <button className="w-1/6 rounded-lg bg-background py-1 text-white">
            Add
          </button>
        </div>
      </div>
      <button
        className="mx-auto mb-1 mt-4 w-full rounded-lg bg-background py-1 text-white"
        type="submit"
      >
        Create
      </button>
      {error.length > 0 ? <p className="text-red-600">{error}</p> : null}
    </section>
  );
}
