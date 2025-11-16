import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const closeNavbar = () => {
    setIsOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <nav className="actor-navbar">
      <div className="nav-container">
        <Link className="nav-brand" to="/" onClick={closeNavbar}>
          <span className="brand-first">Marius</span>
          <span className="brand-last">Manole</span>
        </Link>

        <button
          className={`nav-toggle ${isOpen ? "active" : ""}`}
          onClick={toggleNavbar}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-menu ${isOpen ? "active" : ""}`}>
          <Link
            to="/"
            className={`nav-link ${isActive("/")}`}
            onClick={closeNavbar}
          >
            Despre mine
          </Link>
          <Link
            to="/repertoriu"
            className={`nav-link ${isActive("/repertoriu")}`}
            onClick={closeNavbar}
          >
            Repertoriu
          </Link>
          <Link
            to="/upcoming-shows"
            className={`nav-link ${isActive("/upcoming-shows")}`}
            onClick={closeNavbar}
          >
            Ce urmează
          </Link>
          <Link
            to="/blog"
            className={`nav-link ${isActive("/blog")}`}
            onClick={closeNavbar}
          >
            Gânduri
          </Link>
          <Link
            to="/community"
            className={`nav-link ${isActive("/community")}`}
            onClick={closeNavbar}
          >
            Scena voastră
          </Link>
        </div>
      </div>
    </nav>
  );
}
