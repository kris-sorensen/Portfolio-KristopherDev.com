
import React, { useState, useEffect } from 'react';
import './styles/content.css'

const ContentContainer = () => {

    // const [hovered, setHovered] = useState()

    // useEffect(() => {
    //     console.log('hovering or not')
    // }, [hovered])

    return (
        <>
            <div className="textContainer">
                <h1 id="name">Kristopher Sorensen</h1>
                <h2 id="title">Creative Software Developer</h2>

            </div>
            {/* <nav >
                <ol className="navContainer">
                    <li className="about">About</li>
                    <li className="work">Work</li>
                </ol>
            </nav>
            <div className="social">
                <img id="plus" src="add.png" alt="Social Links" />
            </div> */}
        </>

    );
}

export default ContentContainer;
