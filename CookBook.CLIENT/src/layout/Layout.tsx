import { createContext, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import { Recipe } from "../models/Recipe";

interface ContextProps {
  jwt: string | null;
  recipe: Recipe | undefined | null;
  setJwt: React.Dispatch<React.SetStateAction<string>> | null;
  setRecipe: React.Dispatch<React.SetStateAction<Recipe | undefined>> | null;
}

export const AppContext = createContext<ContextProps>({
  jwt: null,
  recipe: null,
  setJwt: null,
  setRecipe: null,
});

export default function Layout() {
  const [jwt, setJwt] = useState<string>(sessionStorage.getItem("jwt") ?? "");
  const [recipe, setRecipe] = useState<Recipe>();

  return (
    <div className="flex min-h-screen flex-col">
      <AppContext.Provider value={{ jwt, setJwt, recipe, setRecipe }}>
        <Header />
        <Main />
        <Footer />
      </AppContext.Provider>
    </div>
  );
}
