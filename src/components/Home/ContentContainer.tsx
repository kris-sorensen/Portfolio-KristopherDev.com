import React, {useState, useRef, useEffect} from 'react';
import gsap from 'gsap';
import {motion} from "framer-motion";

import './styles/content.css';

const ContentContainer=() => {
    //Hooks
    const [isClicked, setIsClicked]=useState(true);
    // Auto Lauch Social Links Animation
    useEffect(() => {
        const timer=setTimeout(() => handleClick(), 4000);
        return () => clearTimeout(timer);
    }, []);

    //Refs

    const plusRef=useRef(null);
    const gitRef=useRef(null);
    const linkedInRef=useRef(null);
    const emailRef=useRef(null);

    /**
     * Animations
     */

    // Hover Effect Scale Img on Hover
    const handleHover=(el: gsap.TweenTarget) => {
        gsap.to(el, {
            scale: 1.2,
        });
    };

    const handleHoverExit=(el: gsap.TweenTarget) => {
        gsap.to(el, {
            scale: 1,
        });
    };

    // onClick Animation for Plus svg
    const handleClick=() => {
        setIsClicked(!isClicked);
        if(isClicked) {
            gsap.to(plusRef.current, {
                rotation: 45,
            });
            gsap.to(gitRef.current, {
                x: -60,
                opacity: 1,
                duration: .5,
            });
            gsap.to(linkedInRef.current, {
                x: -120,
                opacity: 1,
                duration: 1,
            });
            gsap.to(emailRef.current, {
                x: -180,
                opacity: 1,
                duration: 1.5,
            });

        }
        else {
            gsap.to(plusRef.current, {
                rotation: 0,
            });
            gsap.to(gitRef.current, {
                x: 0,
                opacity: 0,
                duration: .5,
            });
            gsap.to(linkedInRef.current, {
                x: 0,
                opacity: 0,
                duration: 1,
            });
            gsap.to(emailRef.current, {
                x: 0,
                opacity: 0,
                duration: 1.5,
            });
        }
    };

    // Onclick events for social Icons
    const handleGitClick=() => {
        window.open("https://github.com/kris-sorensen");
    };
    const handleLinkedInClick=() => {
        window.open("https://www.linkedin.com/in/kris-sorensen/");
    };
    const handleEmailClick=() => {
        window.open('mailto:krismsorensen@gmail.com?');
    };



    return (
        <div className="page">
            <header>
                <h1 id="name">Software Developer</h1>
                <h2 id="title">Kristopher Sorensen</h2>
            </header>
            {/* <nav >
                <ol className="navContainer">
                    <li className="about">About</li>
                    <li className="work">Work</li>
                </ol>
            </nav> */}
            <div className="container">
                <div className="socialContainer">
                    <div className="social icon" >
                        <motion.img id="plus" onHoverStart={() => handleHover(plusRef.current)} onHoverEnd={() => handleHoverExit(plusRef.current)} src="add.png" ref={plusRef} alt="Social Links" onClick={() => handleClick()} />
                    </div>
                    <div className="socialGit icon invis-icon">
                        <motion.img id="git" ref={gitRef} src="git.png" alt="Github" onHoverStart={() => handleHover(gitRef.current)} onHoverEnd={() => handleHoverExit(gitRef.current)} onClick={() => handleGitClick()} />
                    </div>
                    <div className="socialLI icon invis-icon" >
                        <motion.img id="linkedIn" ref={linkedInRef} src="linkedIn.png" alt="LinkedIn" onHoverStart={() => handleHover(linkedInRef.current)} onHoverEnd={() => handleHoverExit(linkedInRef.current)} onClick={() => handleLinkedInClick()} />
                    </div>
                    <div className="socialEmail icon invis-icon" >
                        <motion.img id="email" ref={emailRef} src="email.png" alt="Email" onHoverStart={() => handleHover(emailRef.current)} onHoverEnd={() => handleHoverExit(emailRef.current)} onClick={() => handleEmailClick()} />
                    </div>
                </div>
            </div>
        </div>

    );
};


export default ContentContainer;
