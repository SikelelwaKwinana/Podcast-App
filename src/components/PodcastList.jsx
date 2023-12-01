import React, { useState, useEffect } from 'react';
import Preview from './Preview'; // Adjust the import to the correct component
import '../styles/podcast.css'; // Add your styles import if needed

const PodcastList = ({ onSelectShow }) => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedShowId, setSelectedShowId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://podcast-api.netlify.app/shows');

        if (!response.ok) {
          throw new Error('Something went wrong. Try again later.');
        }

        const data = await response.json();
        setPodcasts(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };

    fetchData(); // Initial fetch on mount
  }, []); // Dependencies array is empty to run once on mount

  const handleSelectShow = (showId) => {
    setSelectedShowId(showId);
    onSelectShow(showId); // Optionally, trigger the onSelectShow prop
  };

  return (
    <div className="podcast-list-container">
      {loading ? (
        <div className="loading-message">Loading Podcasts...</div>
      ) : (
        <div>
          <ul className="show-list">
            {podcasts.map((show) => (
              <li key={show.id} className="show-container">
                <div className="show-info">
                  <img src={show.image} alt={`Cover for ${show.title}`} />
                  <h3>{show.title}</h3>
                  <h3>{`Seasons: ${show.seasons}`}</h3>
                  <button onClick={() => handleSelectShow(show.id)}>View Details</button>
                </div>
              </li>
            ))}
          </ul>
          {selectedShowId && <Preview showId={selectedShowId} />} {/* Update this line */}
        </div>
      )}
    </div>
  );
};

export default PodcastList;
