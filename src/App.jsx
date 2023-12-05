
import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/NavBar";
import PodcastList from "./components/PodcastList";
import ShowDetails from "./components/ShowDetails";

export default function App() {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedSort, setSelectedSort] = useState("A-Z");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    navigate("/");
  };

  const handleSortChange = (sort) => {
    setSelectedSort(sort);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="app-container">
      <Navbar
        onFilterChange={handleGenreChange}
        onSortChange={handleSortChange}
        onSearch={handleSearch}
      />
      <div>
        <Routes>
          <Route
            path="/:genre?"
            element={
              <PodcastList
                selectedGenre={selectedGenre}
                selectedSort={selectedSort}
                searchQuery={searchQuery}
              />
            }
          />
          <Route path="/shows/:id" element={<ShowDetails />} />
        </Routes>
      </div>
    </div>
  );
}
