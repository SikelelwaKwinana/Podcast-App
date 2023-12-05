import React from "react";

const GenreFilter = ({ onFilterChange }) => {
  const genres = [
    "All",
    "Personal Growth",
    "True Crime and Investigative Journalism",
    "History",
    "Comedy",
    "Entertainment",
    "Business",
    "Fiction",
    "News",
    "Kids and Family",
  ];

  return (
    <div className="genre-filter-container">
      <label htmlFor="genreSelect">Filter by Genre: </label>
      <select id="genreSelect" onChange={(e) => onFilterChange(e.target.value)}>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenreFilter;
