import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        AI Resume Analyzer
      </div>

      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/resume-comparison">
            Resume Comparison
          </Link>
        </li>
        <li>
        <Link to="/mock-interview">
          Mock Interview
        </Link>
        </li>

        <li>
          <a href="#features">Features</a>
        </li>

        <li>
          <a href="#about">About</a>
        </li>
      </ul>

      <Link to="/">
        <button className="navbar-btn">
          Resume Analyzer
        </button>

      </Link>
    </nav>
  );
}

export default Navbar;