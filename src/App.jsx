import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/NavBar";
import PodcastList from "./components/PodcastList";
import ShowDetails from "./components/ShowDetails";
import { RecentlyViewed } from "./components/RecentlyViewed";
import { AudioPlayerProvider } from "./components/AudioContext";
import BottomNav from "./components/BottomNav";
import AudioPlayer from "./components/AudioPlayer";

export default function App() {
  const [selectedGenre, setSelectedGenre] = React.useState("All");
  const [selectedSort, setSelectedSort] = React.useState("A-Z");
  const [searchQuery, setSearchQuery] = React.useState("");
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

  const handleHomeClick = () => {
    setSelectedGenre("All");
    setSelectedSort("A-Z");
    setSearchQuery("");
    navigate("/");
  };

  const handleRecentlyViewed = () => {
    navigate("/recently-viewed");
  };

  return (
    <AudioPlayerProvider>
      <div className="app-container">
        <Navbar
          onHomeClick={handleHomeClick}
          onSearch={handleSearch}
          onRecentlyViewed={handleRecentlyViewed}
          onFilterChange={handleGenreChange}
          onSortChange={handleSortChange}
        />
        <div>
          <Routes>
            <Route
              path="/:genre?"
              element={
                <>
                  <PodcastList
                    selectedGenre={selectedGenre}
                    selectedSort={selectedSort}
                    searchQuery={searchQuery}
                  />
                  <AudioPlayer />
                </>
              }
            />
            <Route path="/shows/:id" element={<ShowDetails />} />
            <Route path="/recently-viewed" element={<RecentlyViewed />} />
          </Routes>
        </div>
        <BottomNav />
      </div>
    </AudioPlayerProvider>
  );
}
