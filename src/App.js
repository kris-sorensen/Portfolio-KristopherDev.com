import React, { createContext, useState } from 'react';

// import logo from './logo.svg';
import './App.css';
import ContentContainer from './Components/ContentContainer'
import CanvasContainer from './Components/CanvasContainer'

export const radiusContext = createContext()

function App() {
  const [earthRadius, setEarthRadius] = useState({ earthRadius: null });

  return (
    <radiusContext.Provider value={[earthRadius, setEarthRadius]}>
      <div className="App">
        <ContentContainer />
        <CanvasContainer />
      </div>
    </radiusContext.Provider>
  );
}

export default App;
