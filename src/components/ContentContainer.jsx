
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap'
import { motion } from "framer-motion";

import './styles/content.css'

const ContentContainer = () => {
    //Hooks
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(true);

    //Refs
    const plusRef = useRef()
    const gitRef = useRef()
    const linkedInRef = useRef()
    const emailRef = useRef()

    /**
     * Animations
     */

    // Hover Effect for Plus SVG
    const handleHover = () => {
        gsap.to(plusRef.current, {
            scale: 1.2,
            duration: .2,
        })
    }

    const handleHoverExit = () => {
        gsap.to(plusRef.current, {
            scale: 1,
            duration: .1,
        })
    }

    // onClick Animation for Plus svg
    const handleClick = () => {
        setIsClicked(!isClicked)
        if (isClicked) {
            gsap.to(plusRef.current, {
                rotation: 45,
            })
            gsap.to(gitRef.current, {
                x: -90,
                opacity: 1,
                duration: .5,
            })
            gsap.to(linkedInRef.current, {
                x: -180,
                opacity: 1,
                duration: 1,
            })
            gsap.to(emailRef.current, {
                x: -270,
                opacity: 1,
                duration: 1.5,
            })

        }
        else {
            gsap.to(plusRef.current, {
                rotation: 0,
            })
            gsap.to(gitRef.current, {
                x: 0,
                opacity: 0,
                duration: .5,
            })
            gsap.to(linkedInRef.current, {
                x: 0,
                opacity: 0,
                duration: 1,
            })
            gsap.to(emailRef.current, {
                x: 0,
                opacity: 0,
                duration: 1.5,
            })
        }
    }

    // Onclick events for social Icons
    const handleGitClick = () => {
        window.open("https://github.com/kris-sorensen");
    }
    const handleLinkedInClick = () => {
        window.open("https://www.linkedin.com/in/kris-sorensen/");
    }




    return (
        <>
            <div className="textContainer">
                <h1 id="name">Kristopher Sorensen</h1>
                <h2 id="title">Creative Software Developer</h2>

            </div>
            <nav >
                <ol className="navContainer">
                    <li className="about">About</li>
                    <li className="work">Work</li>
                </ol>
            </nav>
            <div className="social" >
                <motion.img id="plus" onHoverStart={handleHover} onHoverEnd={handleHoverExit} src="add.png" ref={plusRef} alt="Social Links" onClick={() => handleClick()} />
            </div>
            <div className="socialGit">
                <img id="git" ref={gitRef} src="git.png" alt="Github" onClick={() => handleGitClick()} />
            </div>
            <div className="socialLI" >
                <img id="linkedIn" ref={linkedInRef} src="linkedIn.png" alt="LinkedIn" onClick={() => handleLinkedInClick()} />
            </div>
            <div className="socialEmail" >
                <img id="email" ref={emailRef} src="email.png" alt="Email" />
            </div>
        </>

    );
}

export default ContentContainer;
