// Navbar.jsx
import React, { useState } from "react"
import '../styles/navbar.css'

export default function Navbar () {
  
  return (
    <nav className="navBar">
      <div className="nav--container"> 
      <div className="nav--brand">
      <img src="/src/images/microphone.png" 
                className="nav--image" 
                style={{ width: '40px', height: '40px', }}
            />
      <h1 className="nav--title"> Pod</h1>
      </div>
      <div className="nav--options">
      <button className="nav--option">Home</button>
          <button className="nav--option">Recently Played</button>
          <button className="nav--option">Favorites</button>
          <button className="nav--option">A-Z</button>
          <button className="nav--option">Z-A</button>
          <button className="nav--option">Filter by Genre</button>
        </div>
      <form className="nav--search">
                <input 
                    type="text"
                    placeholder="Search"
                    className="search--input"
                />     
            </form>
        </div>
    </nav>
  );
};

