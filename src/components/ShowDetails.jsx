import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ShowDetails = () => {
  const { id } = useParams();
  const [showDetail, setShowDetail] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch show details. Status: ${response.status}`);
        }

        const data = await response.json();
        setShowDetail(data);
      } catch (error) {
        console.error('Error fetching show details:', error.message);
      }
    };

    fetchShowDetails();
  }, [id]);

  const handleSeasonSelect = (seasonNumber) => {
    console.log('Clicked Season:', seasonNumber);
    setSelectedSeason(seasonNumber);
  };

  return (
    <div>
      {showDetail ? (
        <div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={showDetail.image} alt={showDetail.title} style={{ width: '50px', height: '50px' }} />
            <h1>{showDetail.title}</h1>
          </div>
          <p>{showDetail.description}</p>
          <h3>Last Updated: {new Date(showDetail.updated).toLocaleDateString()}</h3>

          <h4>Seasons:</h4>
          <ul>
            {showDetail?.seasons?.map((season) => (
              <li key={season.season}>
                <button onClick={() => handleSeasonSelect(season.season)}>
                  {season.title}
                </button>
              </li>
            ))}
          </ul>

          {selectedSeason && (
            <div>
              <h4>{`Season ${selectedSeason}`}</h4>
              {showDetail.seasons
                .filter((season) => season.season === selectedSeason)
                .map((season) => (
                  <div key={season.image}>
                    <img src={season.image} alt={`Season ${season.season}`} style={{ width: '100px', height: '100px' }} />
                 
                      <ul>
                    {season.episodes.map((episodes) => (
                        <li key={episodes.episode}>
                          <strong>{episodes.title}</strong>
                          <p>{episodes.description}</p>
                          {episodes.file && episodes.file.url && (
                            <div>
                              <strong>Listen:</strong>
                              <audio controls>
                                <source src={episodes.file.url} type="audio/mp3" />
                                Your browser does not support the audio element.
                              </audio>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ShowDetails;

//    <div key={season.title}>