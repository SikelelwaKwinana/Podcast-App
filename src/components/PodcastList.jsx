// components/PodcastList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoadingPage from './LoadingPage';
import '../styles/podcast.css'

const PodcastList = () => {
  const [loading, setLoading] = useState(true);
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://podcast-api.netlify.app/shows');
        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        const data = await response.json();
        setPodcasts(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const formatDate = (dateString) => {
    const date = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, date);
  };

  return (
    <div>
      {loading ? (
        <LoadingPage />
      ) : (
        <ul>
          {podcasts.map((podcast) => (
            <li key={podcast.id} className="container">
              <Link to={`/shows/${podcast.id}`}>
                <img src={podcast.image} alt={podcast.title} />
                <div>
                  <h3>{podcast.title}</h3>
                  <p>{`Seasons: ${podcast.seasons}`}</p>
                  <p>{`Last updated: ${formatDate(podcast.updated)}`}</p>
                  <p>{`Genre: ${podcast.genre}`}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PodcastList;
