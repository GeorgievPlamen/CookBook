import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "./Layout";

export default function Header() {
  const context = useContext(AppContext);

  const { jwt, setJwt } = context;
  const jwtLength = jwt ? jwt.length : 0;

  return (
    <header className="h-12 bg-background text-white shadow-sm shadow-black">
      <nav className="h-full">
        <ul className="flex h-full items-center justify-around gap-4">
          <li>
            <NavLink
              className={({ isActive }) => `${isActive ? "underline" : null}`}
              to="/createrecipe"
            >
              Create Recipe
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => `${isActive ? "underline" : null}`}
              to="/"
            >
              Recipes
            </NavLink>
          </li>
          <li>
            {jwtLength < 1 ? (
              <NavLink
                className={({ isActive }) => `${isActive ? "underline" : null}`}
                to="/signin"
              >
                Sign in
              </NavLink>
            ) : (
              <button
                onClick={() => {
                  sessionStorage.removeItem("jwt");
                  setJwt!("");
                }}
              >
                Sign out
              </button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
