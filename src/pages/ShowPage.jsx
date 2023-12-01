// ShowPage.jsx
import React from 'react';
import ReactDOM from 'react-dom';

const ShowPage = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Show Page</h2>
      <ShowDetail match={{ params: { id } }} />
      <SeasonList />
      <EpisodeList />
      {/* Your additional content here */}
    </div>
  );
};

export default ShowPage;
