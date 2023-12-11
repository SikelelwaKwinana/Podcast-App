import React, { useState } from "react";
import { Link } from "react-router-dom";
import GenreFilter from "./GenreFilter";
import SortButton from "./SortButton";
import "../styles/navbar.css";

const Navbar = ({ onFilterChange, onSortChange, onSearch, onHomeClick }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery);
    setSearchQuery("")
  };

  return (
    <div>
      <nav className="navBar">
        <div className="nav--container">
          <div className="nav--brand">
          <Link to="/" onClick={onHomeClick} className="home-button">
              <img src="/src/images/microphone.png" className="nav--image" alt="Podcast Logo" />
              <h1 className="nav--title"> Pod</h1>
            </Link>
          </div>
          <form
            className="nav--search"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <input
              type="text"
              placeholder="Search"
              className="search--input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
        <div className="nav--options">
            <button className="nav--option">Recently Viewed</button>
          </div>
        <div className="nav--actions">
          <SortButton onSortChange={onSortChange} />
            <GenreFilter onFilterChange={onFilterChange} />
            
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
