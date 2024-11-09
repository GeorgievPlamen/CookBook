import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { JwtContext } from "./Layout";

export default function Header() {
  const context = useContext(JwtContext);

  const { jwt, setJwt } = context;

  return (
    <header className="bg-background h-12 text-white shadow-sm shadow-black">
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
              Search
            </NavLink>
          </li>
          <li>
            {jwt!.length < 1 ? (
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
