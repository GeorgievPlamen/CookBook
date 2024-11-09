import { createBrowserRouter, Link } from "react-router-dom";
import Layout from "./Layout";
import Recipes from "../pages/Recipes/Recipes";
import CreateRecipe from "../pages/CreateRecipe/CreateRecipe";
import SignIn from "../pages/SignIn/SignIn";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: (
      <>
        <h2>Oops... Something went wrong :(</h2>
        <Link to="/">Reload</Link>
      </>
    ),
    children: [
      {
        path: "*",
        element: <Recipes />,
      },
      {
        path: "/",
        element: <Recipes />,
      },
      {
        path: "/createrecipe",
        element: <CreateRecipe />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
    ],
  },
]);
