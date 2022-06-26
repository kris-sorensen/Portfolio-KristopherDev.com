import React from 'react';

import './App.css';
import ContentContainer from './components/ContentContainer'
import CanvasContainer from './Components/CanvasContainer'

function App() {

  return (
    <div className="App" >
      <ContentContainer />
      <CanvasContainer />
    </div>
  );
}

export default App;