// Navbar.jsx
import React, { useState } from "react"
import '../styles/navbar.css'

export default function Navbar () {
  

  return (
    <nav className="navBar">
      
      <img src="/src/images/microphone.png" 
                className="nav--image" 
                style={{ width: '40px', height: '40px', }}
            />
      <h1 className="nav--title"> Podcasts</h1>
      <form className="nav--search">
                <input 
                    type="text"
                    placeholder="Search"
                    className="search--input"
                />     
            </form>
    </nav>
  );
};

