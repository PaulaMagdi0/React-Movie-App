/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import LanguageContext from "../context/LanguageContext";

const Navbar = ({ onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { lang, setLang } = useContext(LanguageContext);
  console.log(lang);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleLanguageChange = (language) => {
    setLang(language);
  };

  return (
    <header id="masthead" role="banner" className="site-header bg-black">
      <div className="container-fluid px-0">
        <nav className="navbar navbar-dark px-3">
          <div className="d-flex justify-content-between align-items-center w-100">
            <Link to="/" className="navbar-brand fs-1 fw-bold">
              Movies
            </Link>
            <div className="d-flex gap-3">
              <button
                className="navbar-toggler"
                type="button"
                onClick={toggleMenu}
                aria-controls="navbarNav"
                aria-expanded={isMenuOpen}
                aria-label="Toggle search bar"
              >
                <i className="fas fa-search"></i>
              </button>
              <Link to="/wishlist" className="navbar-toggler">
                <i className="fas fa-heart"></i>
              </Link>
              <Link to="/registration" className="navbar-toggler">
                <i className="fas fa-user"></i>
              </Link>
              <div className="dropdown">
                <button
                  className="btn btn-success dropdown-toggle"
                  type="button"
                  id="languageDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Language
                </button>
                <ul className="dropdown-menu" aria-labelledby="languageDropdown">
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleLanguageChange("en")}
                    >
                      en
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleLanguageChange("ar")}
                    >
                      ar
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            className={`flex-grow-1 search-container ${
              isMenuOpen ? "show" : ""
            }`}
          >
            <form className="d-flex" role="search" onSubmit={handleSearch}>
              <input
                type="search"
                className="form-control me-2"
                placeholder="Search for a movie"
                aria-label="Search"
                name="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="btn btn-outline-light"
                onKeyDown={handleKeyPress}
              >
                Search
              </button>
            </form>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
