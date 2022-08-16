
import React from 'react';
import './styles/about.css';
import AboutCanvas from './AboutCanvas';
import Navbar from '../Portals/Navbar';

const About=() => {

    return (
        <div style={{height: '100%', width: '100%'}} className="about">
            <AboutCanvas />
            {/* <Navbar /> */}
            {/* <AboutContent /> */}
        </div>
    );
};

export default About;