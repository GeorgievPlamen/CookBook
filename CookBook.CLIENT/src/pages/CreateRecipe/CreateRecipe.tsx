import { useEffect, useState } from "react";
import { Ingredient } from "../../models/Ingredient";
import { api } from "../../api/CookBookApi";
import { CreateRecipe as CreateRecipeRequest } from "../../models/Recipe";
import { AxiosError } from "axios";

export default function CreateRecipe() {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [fileBase64, setFileBase64] = useState<string>("");
  const [timeToPrepare, setTimeToPrepare] = useState(60);
  const [howToPrepare, setHowToPrepare] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [addedIngredients, setAddedIngredients] = useState<Ingredient[]>([]);
  const [type, setType] = useState(0);
  const [isIngredientPanelOpen, setIsIngredientPanelOpen] = useState(false);
  const [ingredientForCreationName, setIngredientForCreationName] =
    useState("");

  console.log(ingredients);

  useEffect(() => {
    api.ingredients.getAll().then((x) => setIngredients(x));
  }, []);

  function addedIngredient() {
    const selectedIng = ingredients.find((x) => x.id === selectedIngredient);

    if (selectedIng) setAddedIngredients([...addedIngredients, selectedIng]);
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  function formatTimeToPrepare(timeToPrepare: number): string {
    const hours = Math.floor(timeToPrepare / 60);
    const minutes = timeToPrepare % 60;
    const seconds = 0;

    const hoursStr = String(hours).padStart(2, "0");
    const minutesStr = String(minutes).padStart(2, "0");
    const secondsStr = String(seconds).padStart(2, "0");

    return `${hoursStr}:${minutesStr}:${secondsStr}`;
  }

  async function createIngredient() {
    await api.ingredients.create({ name: ingredientForCreationName });
    api.ingredients.getAll().then((x) => setIngredients(x));
    setIsIngredientPanelOpen(false);
  }

  function handleSubmit() {
    const recipeData: CreateRecipeRequest = {
      name: name,
      imageBase64: fileBase64.split("data:image/jpeg;base64,/9j/")[1],
      timeToPrepare: formatTimeToPrepare(timeToPrepare),
      instructions: howToPrepare,
      ingredientIds: addedIngredients.map((x) => x.id),
      type: Number(type),
    };

    api.recipes.create(recipeData).catch((err) => {
      const axiosErr = err as AxiosError;
      setError(axiosErr.message);
    });
  }

  return (
    <section className="w-1/2 justify-center rounded-lg border px-4 py-2 shadow-md shadow-slate-500">
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
          onChange={handleFileChange}
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
            {ingredients
              .filter((x) => !addedIngredients.some((y) => y.id === x.id))
              .map((x) => (
                <option key={x.id} value={x.id}>
                  {x.name}
                </option>
              ))}
          </select>
          <button
            onClick={() => addedIngredient()}
            className="w-1/6 rounded-lg bg-background py-1 text-white"
          >
            Add
          </button>
          {addedIngredients.map((x) => (
            <div
              key={x.id}
              className="my-2 flex items-center justify-between gap-2"
            >
              <p className="pl-4 font-mono">{x.name}</p>
              <button
                onClick={() =>
                  setAddedIngredients(
                    addedIngredients.filter((y) => y.id !== x.id),
                  )
                }
                className="w-1/6 rounded-lg bg-background py-1 text-white"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto flex w-2/3 items-center justify-end">
        <button
          onClick={() => setIsIngredientPanelOpen(!isIngredientPanelOpen)}
          className="text-end text-xs font-light underline"
        >
          Missing Ingredient?
        </button>
      </div>
      {isIngredientPanelOpen && (
        <div className="mx-auto mb-2 flex w-2/3 flex-col">
          <label htmlFor="createIngredient">Ingredient Name</label>
          <div>
            <input
              onChange={(e) => setIngredientForCreationName(e.target.value)}
              name="createIngredient"
              className="w-5/6 rounded-lg border-2 py-1"
            />
            <button
              onClick={createIngredient}
              className="w-1/6 rounded-lg bg-background py-1 text-white"
            >
              Create
            </button>
          </div>
        </div>
      )}
      <div className="mx-auto mb-2 flex w-2/3 flex-col">
        <label htmlFor="type">Type</label>
        <select
          name="type"
          className="rounded-lg border-2 py-1"
          onChange={(e) => setType(e.target.value as unknown as number)}
        >
          <option value={0}>Breakfast</option>
          <option value={1}>Brunch</option>
          <option value={2}>Lunch</option>
          <option value={3}>Tea</option>
          <option value={4}>Supper</option>
          <option value={5}>Dinner</option>
        </select>
      </div>
      <button
        className="mx-auto mb-1 mt-4 w-full rounded-lg bg-background py-1 text-white"
        type="submit"
        onClick={handleSubmit}
      >
        Create
      </button>
      {error.length > 0 ? <p className="text-red-600">{error}</p> : null}
    </section>
  );
}
