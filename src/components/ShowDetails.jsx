import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import LoadingPage from "./LoadingPage";

const ShowDetails = () => {
  const { id } = useParams();
  const [showDetail, setShowDetail] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await fetch(
          `https://podcast-api.netlify.app/id/${id}`
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch show details. Status: ${response.status}`
          );
        }

        const data = await response.json();
        const episodesWithAudio = await Promise.all(
          data.seasons.map(async (season) => {
            const episodesWithAudio = await Promise.all(
              season.episodes.map(async (episode) => {
                const audioResponse = await fetch(episode.file);
                if (audioResponse.ok) {
                  const audioData = await audioResponse.blob();
                  const audioUrl = URL.createObjectURL(audioData);
                  return { ...episode, file: audioUrl };
                }
                return episode;
              })
            );
            return { ...season, episodes: episodesWithAudio };
          })
        );

        setShowDetail({ ...data, seasons: episodesWithAudio });
      } catch (error) {
        console.error("Error fetching show details:", error.message);
      }
    };
    fetchShowDetails();
  }, [id]);

  const handleSeasonSelect = (seasonNumber) => {
    console.log("Clicked Season:", seasonNumber);
    setSelectedSeason(seasonNumber);
  };

  const handlePlay = (episode) => {
    const audioFile = episode.file;
    console.log("Play:", audioFile);

    const audio = new Audio(audioFile);
    audio.play();

    setSelectedEpisode(episode);
  };

  return (
    <div className="show-details">
      <Link to="/">
        <button className="back-button">Back</button>
      </Link>
      {showDetail ? (
        <div>
          <div className="show-details-header">
            <img
              src={showDetail.image}
              alt={showDetail.title}
              className="show-details-image"
            />
            <h1>{showDetail.title}</h1>
          </div>
          <p>{showDetail.description}</p>
          <h3>
            Last Updated: {new Date(showDetail.updated).toLocaleDateString()}
          </h3>

          <h4>Seasons:</h4>
          <ul className="season-buttons">
            {showDetail?.seasons?.map((season) => (
              <li key={season.season}>
                <button onClick={() => handleSeasonSelect(season.title)}>
                  {season.season}
                </button>
              </li>
            ))}
          </ul>

          {selectedSeason && (
            <div>
              <h4>{`Season title: ${selectedSeason}`}</h4>
              {showDetail.seasons
                .filter((season) => season.title === selectedSeason)
                .map((season) => (
                  <div key={season.image}>
                    <img
                      src={season.image}
                      alt={`Season ${season.season}`}
                      className="season-image"
                    />
                    <ul>
                      {season.episodes.map((episode) => (
                        <li
                          key={episode.episode}
                          className={`episode-container ${
                            episode === selectedEpisode ? "selected" : ""
                          }`}
                        >
                          <p className="episode-number">{`Episode: ${episode.episode}`}</p>
                          <strong>{episode.title}</strong>
                          <p>{episode.description}</p>
                          <div className="button-container">
                            <button
                              onClick={() => handlePlay(episode)}
                              className="play-button"
                            >
                              ▶️ Play
                            </button>
                            <button
                              onClick={() => handleAddToFavourites(episode)}
                              className="favourites-button"
                            >
                              ❤️ Add to Favourites
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          )}
        </div>
      ) : (
        <LoadingPage />
      )}
    </div>
  );
};

export default ShowDetails;
