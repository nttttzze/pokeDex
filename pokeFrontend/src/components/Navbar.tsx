import { Link } from "react-router-dom";
import "../Navbar.css";
export function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <Link to="/">
          <button id="nav-btn">Home</button>
        </Link>
        <Link to="/PokeDex">
          <button id="nav-btn">Pokedex</button>
        </Link>
        <Link to="/InfoPage">
          <button id="nav-btn">Info</button>
        </Link>
      </ul>
    </nav>
  );
}
