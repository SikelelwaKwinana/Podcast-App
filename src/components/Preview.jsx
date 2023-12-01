// ShowDetails.js

import React, { useState, useEffect } from 'react';

const ShowDetails = ({ showId }) => {
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await fetch(`https://podcast-api.netlify.app/id/${showId}`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setShow(data);
      } catch (error) {
        console.error('Error fetching show details:', error.message);
      } finally {
        setLoading(false); // Set loading to false after fetch (whether successful or not)
      }
    };

    fetchShowDetails();
  }, [showId]);

  if (!show) {
    return null; // Render nothing until the show details are fetched
  }

  return (
  <div>
      <h1>{show.title}</h1>
      <h1>{show.genre}</h1>
      <p>{show.description}</p>
      <h1>{show.updated}</h1>
    </div>
  );
};

export default ShowDetails;
