import React from 'react';
import {useNavigate} from "react-router-dom";
import './styles/navbar.css';

//todo: need to add a mouse hover effect to links. make into a mobile menu


function Navbar() {
    const navigate=useNavigate();
    return (

        <div className="container-nav-mobile">
            <div className="phone">
                <div className="content">

                    <nav role="navigation">
                        <div id="menuToggle">
                            <input type="checkbox" />
                            <span></span>
                            <span></span>
                            <span></span>
                            <ul id="menu">
                                <li><a onClick={() => navigate('/')}>Home</a></li>
                                <li><a onClick={() => document.location='/about'}>About</a></li>
                                <li><a onClick={() => navigate('/connect')}>Connect</a></li>

                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default Navbar;

// ref={aboutRef} onHoverStart={() => handleHover(aboutRef.current)} onHoverEnd={() => handleHoverExit(aboutRef.current)}