// App.js
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Navbar from './components/NavBar'
import PodcastList from './components/PodcastList';
import ShowDetails from './components/ShowDetails';




function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<PodcastList />} />
          <Route path="/shows/:id" element={<ShowDetails />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;
