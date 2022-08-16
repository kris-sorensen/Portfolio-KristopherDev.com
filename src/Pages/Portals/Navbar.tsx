import React from 'react';
import {useNavigate} from "react-router-dom";
import './styles/navbar.css';

//todo: need to add a mouse hover effect to links. make into a mobile menu


function Navbar() {
    const navigate=useNavigate();
    return (
        <nav >
            <ol className="navContainer">
                <li className="about" onClick={() => navigate('/about')}>About</li>

                {/* <li className="work">Work</li> */}
            </ol>
        </nav>
    );
}

export default Navbar;

// ref={aboutRef} onHoverStart={() => handleHover(aboutRef.current)} onHoverEnd={() => handleHoverExit(aboutRef.current)}