// App.jsx
import React, { useState, useEffect } from 'react'
import PodcastList from './components/PodcastList';
import Navbar from './components/NavBar'; 
import Preview from './components/Preview'
import  '../src/styles/podcast.css';

export default function App (){
  const [loading, setLoading] = useState(true);
  const [selectedShow, setSelectedShow] = useState(null);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); 

  }, []);


  // Function to handle the selection of a show
  const handleSelectShow = (showId) => {
    // Simulate fetching show details with a delay (replace this with actual fetching logic)
    setLoading(); // Optional: You can set loading to true while fetching

    setTimeout(() => {

       const showPreview = {
      image: `${showId}`,
      id: showId,
      title: `Show ${showId}`,
      description: `Description ${showId}`,
      genre: `Genre ${showId}`,
    };
    
    setSelectedShow(showPreview);
      setLoading(false); // Optional: Set loading to false when fetching is complete
    }, 1000); // Simulate a 1-second delay, replace with your desired delay
  };


 

  

  return (
  

    <div className="outerWrap">
      <div className="main-Content">
      </div>
      <div className="App">
        {!loading && <Navbar />}
        <PodcastList onSelectShow={handleSelectShow} loading={loading} />
        <Preview show={selectedShow}/>
      </div>
    </div>
  );
}
       
     
 




{/* <Route path="/show/:id" component={ShowPage} />
        <Route path="/favorites" component={FavoritesPage} />
        <Route path="/recently-viewed" component={RecentlyViewed} /> */}