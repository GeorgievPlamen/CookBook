import { Recipe } from "../../models/Recipe";
import RecipeCard from "../../components/RecipeCard";

const recipes: Recipe[] = [
  {
    id: "94bd8726-2913-4900-8f78-cb79f9207ecb",
    name: "Tomato Omelette",
    instructions:
      "Whisk eggs and pour into a hot pan. Add diced tomatoes. Cook until eggs are set.",
    ingredients: [
      {
        id: "099dd615-754d-4f0d-8fd6-375da9bbd429",
        name: "Tomato",
      },
      {
        id: "586a99c9-8ed3-432d-9fd9-9889d3925278",
        name: "Eggs",
      },
    ],
    type: 1,
    timeToPrepare: "00:10:00",
  },
  {
    id: "12412412-2913-4900-8f78-cb79f9207ecb",
    name: "Omlet de Tomata",
    instructions:
      "Cook until eggs are set. Whisk eggs and pour into a hot pan. Add diced tomatoes. ",
    ingredients: [
      {
        id: "586a99c9-8ed3-432d-9fd9-9889d3925278",
        name: "Eggs",
      },
      {
        id: "099dd615-754d-4f0d-8fd6-375da9bbd429",
        name: "Tomato",
      },
    ],
    type: 1,
    timeToPrepare: "00:99:00",
  },
  {
    id: "12412412-2913-4900-8f78-cb79f9207ecb",
    name: "Omlet de Tomata",
    instructions:
      "Cook until eggs are set. Whisk eggs and pour into a hot pan. Add diced tomatoes. ",
    ingredients: [
      {
        id: "586a99c9-8ed3-432d-9fd9-9889d3925278",
        name: "Eggs",
      },
      {
        id: "099dd615-754d-4f0d-8fd6-375da9bbd429",
        name: "Tomato",
      },
    ],
    type: 1,
    timeToPrepare: "00:99:00",
  },
  {
    id: "12412412-2913-4900-8f78-cb79f9207ecb",
    name: "Omlet de Tomata",
    instructions:
      "Cook until eggs are set. Whisk eggs and pour into a hot pan. Add diced tomatoes. ",
    ingredients: [
      {
        id: "586a99c9-8ed3-432d-9fd9-9889d3925278",
        name: "Eggs",
      },
      {
        id: "099dd615-754d-4f0d-8fd6-375da9bbd429",
        name: "Tomato",
      },
    ],
    type: 1,
    timeToPrepare: "00:99:00",
  },
  {
    id: "12412412-2913-4900-8f78-cb79f9207ecb",
    name: "Omlet de Tomata",
    instructions:
      "Cook until eggs are set. Whisk eggs and pour into a hot pan. Add diced tomatoes. ",
    ingredients: [
      {
        id: "586a99c9-8ed3-432d-9fd9-9889d3925278",
        name: "Eggs",
      },
      {
        id: "099dd615-754d-4f0d-8fd6-375da9bbd429",
        name: "Tomato",
      },
    ],
    type: 1,
    timeToPrepare: "00:99:00",
  },
  {
    id: "12412412-2913-4900-8f78-cb79f9207ecb",
    name: "Omlet de Tomata",
    instructions:
      "Cook until eggs are set. Whisk eggs and pour into a hot pan. Add diced tomatoes. ",
    ingredients: [
      {
        id: "586a99c9-8ed3-432d-9fd9-9889d3925278",
        name: "Eggs",
      },
      {
        id: "099dd615-754d-4f0d-8fd6-375da9bbd429",
        name: "Tomato",
      },
    ],
    type: 1,
    timeToPrepare: "00:99:00",
  },
];

export default function Recipes() {
  console.log(recipes);
  return (
    <section className="w-2/3 rounded-lg border px-4 py-2 shadow-md shadow-slate-500">
      <h2 className="mb-2 text-center text-2xl font-bold">Recipes</h2>
      <div className="grid grid-cols-4 gap-4">
        {recipes.map((r) => (
          <RecipeCard recipe={r} key={r.id} />
        ))}
      </div>
    </section>
  );
}
