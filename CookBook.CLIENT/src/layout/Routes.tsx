import { createBrowserRouter, Link } from "react-router-dom";
import Layout from "./Layout";
import Recipes from "../pages/Recipes/Recipes";
import SignIn from "../pages/Account/SignIn";
import SignUp from "../pages/Account/SignUp";
import Recipe from "../pages/Recipes/Recipe";
import CreateRecipe from "../pages/CreateRecipe/CreateRecipe";

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
        path: "/:id",
        element: <Recipe />,
      },
      {
        path: "/createrecipe",
        element: <CreateRecipe />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
]);
