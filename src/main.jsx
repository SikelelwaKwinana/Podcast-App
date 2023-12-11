import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AudioPlayerProvider } from './components/AudioContext';

ReactDOM.render(
  <Router>
    <AudioPlayerProvider>
      <App />
    </AudioPlayerProvider>
  </Router>,
  document.getElementById("root")
);
