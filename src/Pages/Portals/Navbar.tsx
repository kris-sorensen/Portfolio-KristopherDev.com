import React, { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './styles/navbar.css';

//todo: need to add a mouse hover effect to links. make into a mobile menu


function Navbar({ color }: any) {
    const navigate = useNavigate();
    const [toggle, setToggle] = useState(false);


    return (

        <div className="container-nav-mobile">
            <div className="phone">
                <div className="content">
                    <nav role="navigation">
                        <div id="menuToggle" onClick={ () => setToggle(!toggle) }>
                            <input type="checkbox" />
                            <span style={ {
                                background: toggle ? 'turquoise' : color ? color : 'turquoise'
                            } } ></span>
                            <span style={ { background: toggle ? 'white' : color ? color : 'white' } } ></span>
                            <span style={ { background: toggle ? 'violet' : color ? color : 'violet' } }></span>
                            <ul id="menu">
                                <li><a onClick={ () => navigate('/') }>Home</a></li>
                                <li><a onClick={ () => navigate('/about') }>About</a></li>
                                <li><a onClick={ () => navigate('/connect') }>Connect</a></li>

                            </ul>
                        </div>
                    </nav>
                </div>
            </div >
        </div >

    );
}

export default Navbar;

// ref={aboutRef} onHoverStart={() => handleHover(aboutRef.current)} onHoverEnd={() => handleHoverExit(aboutRef.current)}