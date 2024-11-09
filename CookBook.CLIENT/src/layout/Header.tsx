import { NavLink } from "react-router-dom";

export default function Header() {
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
            <NavLink
              className={({ isActive }) => `${isActive ? "underline" : null}`}
              to="/signin"
            >
              Sign in
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
