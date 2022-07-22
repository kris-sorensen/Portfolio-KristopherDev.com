import React from 'react';
import '../../App.css';
import ContentContainer from './ContentContainer';
import CanvasContainer from './CanvasContainer';

function Home() {

    return (
        <div className="App" >
            <ContentContainer />
            <CanvasContainer />
        </div>
    );
}

export default Home;