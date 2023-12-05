
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import SortButton from "./SortButton";
import "../styles/podcast.css";

const PodcastList = ({ selectedGenre, selectedSort, searchQuery }) => {
  const [loading, setLoading] = useState(true);
  const [podcasts, setPodcasts] = useState([]);
  //const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://podcast-api.netlify.app/shows");
        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        const data = await response.json();
        setPodcasts(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const genreObj = {
    1: "Personal Growth",
    2: "True Crime and Investigative Journalism",
    3: "History",
    4: "Comedy",
    5: "Entertainment",
    6: "Business",
    7: "Fiction",
    8: "News",
    9: "Kids and Family",
  };

  const formatGenres = (genreData) => {
    if (Array.isArray(genreData)) {
      return genreData.map((number) => genreObj[number]).join(", ");
    } else if (typeof genreData === "number") {
      return genreObj[genreData] || "Unknown Genre";
    } else {
      return "Unknown Genre";
    }
  };

  const formatDate = (dateString) => {
    const date = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, date);
  };

  const sortPodcasts = (podcasts) => {
    console.log("Selected Sort in sortPodcasts:", selectedSort);
    return [...podcasts].sort((a, b) => {
      if (selectedSort === "a-z") {
        return a.title.localeCompare(b.title);
      } else if (selectedSort === "z-a") {
        return b.title.localeCompare(a.title);
      } else if (selectedSort === "new") {
        return new Date(b.updated) - new Date(a.updated);
      } else if (selectedSort === "old") {
        return new Date(a.updated) - new Date(b.updated);
      }
      return 0;
    });
  };

  const fuzzySearch = (query, podcasts) => {
    const lowerCaseQuery = query.toLowerCase();
    return podcasts.filter((podcast) => {
      const lowerCaseTitle = podcast.title.toLowerCase();
      const lowerCaseGenres = formatGenres(podcast.genres).toLowerCase();

      // Implement your fuzzy matching logic here
      return (
        lowerCaseTitle.includes(lowerCaseQuery) ||
        lowerCaseGenres.includes(lowerCaseQuery)
      );
    });
  };

  const filteredPodcasts =
    selectedGenre !== "All"
      ? podcasts.filter((podcast) =>
          formatGenres(podcast.genres).includes(selectedGenre)
        )
      : podcasts;

  const sortedPodcasts = sortPodcasts(filteredPodcasts);
  const searchResults = searchQuery
    ? fuzzySearch(searchQuery, sortedPodcasts)
    : sortedPodcasts;

  return (
    <div className="row">
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          {searchResults.map((podcast) => (
            <div key={podcast.id} className="container">
              <Link to={`/shows/${podcast.id}`}>
                <img src={podcast.image} alt={podcast.title} />
                <div>
                  <h3>{podcast.title}</h3>
                  <p>{`Seasons: ${podcast.seasons}`}</p>
                  <p>{`Last updated: ${formatDate(podcast.updated)}`}</p>
                  <p>{`Genre: ${formatGenres(podcast.genres)}`}</p>
                </div>
              </Link>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default PodcastList;
