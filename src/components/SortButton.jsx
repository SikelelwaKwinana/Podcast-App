
import React from "react";

const SortButton = ({ onSortChange }) => {
  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    console.log("Selected Sort in SortButton:", selectedSort); 
    onSortChange(selectedSort);
  };

  return (
    <div className="sort-options">
      <label htmlFor="sortSelect">Sort by: </label>
      <select id="sortSelect" onChange={handleSortChange}>
        <option value="a-z">A-Z</option>
        <option value="z-a">Z-A</option>
        <option value="new">Latest</option>
        <option value="old">Oldest</option>
      </select>
    </div>
  );
};

export default SortButton;
