import React from 'react';
import './styles/techstack.css';
import TechstackCanvas from './TechstackCanvas';
import Navbar from '../Portals/Navbar';

const Techstack = () => {


    return (
        <div style={{ height: '100%', width: '100%' }} className="techstack">

            <TechstackCanvas />
            {/* <Navbar /> */}
            {/* <TechstackContent /> */}
        </div>
    );
};

export default Techstack;