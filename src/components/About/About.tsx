
import React from 'react';
import '../../App.css';
import './styles/about.css';
import AboutCanvas from './AboutCanvas';



const About=() => {

    return (
        <div style={{height: '100%', width: '100%'}} className="about">
            <AboutCanvas />
            {/* <AboutContent /> */}
        </div>
    );
};





export default About;