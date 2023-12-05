import React, { useState } from "react";
import { Link } from "react-router-dom";
import GenreFilter from "./GenreFilter";
import PodcastList from "./PodcastList";
import SortButton from "./SortButton";
import "../styles/navbar.css";

const Navbar = ({ onFilterChange, onSortChange, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div>
      <nav className="navBar">
        <div className="nav--container">
          <div className="nav--brand">
            <img src="/src/images/microphone.png" className="nav--image" />
            <h1 className="nav--title"> Pod</h1>
          </div>
          <div className="nav--options"></div>
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
        <div className="nav--actions">
          <SortButton onSortChange={onSortChange} />
          <GenreFilter onFilterChange={onFilterChange} />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
