import React, { useState, useEffect } from 'react';


const getElementSizes = () => {
    if (window.innerWidth <= 490) return {
        earthSize: 7,
        yOff: 7 + .4 + Math.random() * 1.0,
        scale: 1.6,
        mobile: true,
        tension: 0,
        friction: 0,
        speed: 1,
        y: 11,
        cameraY: -1.5,
    };
    else if (window.innerWidth <= 1180) {
        return {
            earthSize: 9.5,
            yOff: 9.5 + .2 + Math.random() * 1.0,
            scale: 1.5,
            mobile: true,
            tension: 0,
            friction: 0,
            speed: 1,
            y: 0,
            cameraY: -1,

        }
    } else return {
        earthSize: 9.5,
        yOff: 9.5 + .2 + Math.random() * 1.0,
        scale: 1.4,
        mobile: false,
        tension: 150,
        friction: 20,
        speed: 2,
        y: 0,
        cameraY: 0,
    }
}


export default function useWindowResize() {
    const [elementSize, setElementSize] = useState(getElementSizes());

    useEffect(() => {
        const onResize = () => {
            setElementSize(getElementSizes());
        }

        window.addEventListener("resize", onResize);

        return () => {
            window.removeEventListener("resize", onResize);
        }
    }, []);

    return elementSize;
}