import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/createrecipe">Create Recipe</Link>
          </li>
          <li>
            <Link to="/">Search</Link>
          </li>
          <li>
            <Link to="/signin">Sign in</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
