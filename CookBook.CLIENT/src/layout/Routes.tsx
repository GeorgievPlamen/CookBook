import { createBrowserRouter, Link } from "react-router-dom";
import Layout from "./Layout";
import Recipes from "../pages/Recipes/Recipes";
import CreateRecipe from "../pages/CreateRecipe/CreateRecipe";
import SignIn from "../pages/SignIn/SignIn";

export const router = createBrowserRouter([
  {
    path: "/",
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
        index: true,
        element: <Recipes />,
      },
      {
        path: "/",
        index: true,
        element: <Recipes />,
      },
      {
        path: "/createrecipe",
        index: true,
        element: <CreateRecipe />,
      },
      {
        path: "/signin",
        index: true,
        element: <SignIn />,
      },
    ],
  },
]);
