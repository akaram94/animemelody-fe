import React from "react";
import Header from "./components/Header";
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlay, faPlus, faMinus, faForward, faBackward, faBars } from '@fortawesome/free-solid-svg-icons';

function App() {
  library.add(faPlay, faPlus, faMinus, faForward, faBackward, faBars);
  return (
    <div id="AppContainer" className="App">
      <Header />
      <div className="container-fluid main-content">
          <div id="welcomeText" className="row">
            <div className="col-12">
              <h1>Welcome!</h1>
              <p>Get started by searching for an anime above.</p>
            </div>
          </div>
          <div className="row">
            <div id="videoContainer" className="col-lg-8">
            </div>
            <div id="tableContainer" className="col-lg-4">
              
            </div>
          </div>
          <div id="queueTableContainer">
            <div className="mx-auto pl-5 pr-5 mt-4">
              <p>You can make a playlist by adding songs using the + button. Your songs will show up here once you add them.</p>
            </div>
          </div>
      </div>
    </div>
  );
}

export default App;
