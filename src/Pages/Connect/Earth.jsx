import React, { useRef } from 'react';
import * as THREE from "three";
import { extend, useFrame } from '@react-three/fiber';
import { Sphere, useTexture, PresentationControls } from "@react-three/drei";
import gsap from 'gsap';
import { useMousePosition } from '../../hooks/useMousePosition';
import useWindowResize from '../../hooks/useWindowResize';
import AtmosphereMaterial from '../../shaders/atmosphere';




//todo: add shadows to all parts
//todoL memo() useMousePosition
// add glowing point light like ghosts on haunted house that follows mouse?
extend({ AtmosphereMaterial });

const Earth = () => {
    //Custom Hooks
    const position = useMousePosition();
    const elementSize = useWindowResize();
    // Texture
    const map = useTexture('/nasaEarth.jpg');
    // const map = useTexture('/nasaEarthSharp.jpg')
    // Refs
    const earthRef = useRef();
    const meshRef = useRef();

    useFrame(() => {
        //Move Earth based on mouse location
        if (elementSize.mobile) return;
        gsap.to(meshRef.current.rotation, {
            y: ((position.x / window.innerWidth) * 2 - 1) * 3.5, // Convert pixel location of mouse into Canvas location
            x: (-(position.y / window.innerHeight) * 2 + 1),
            duration: 3,
        });
    }, -2);

    useFrame(() => {
        // Slowly Rotate Earth
        earthRef.current.rotateY(.0015);
    }, -1);

    return (

        <PresentationControls polar={[-Math.PI * .5, Math.PI * .5]} snap={!elementSize.mobile} config={{ mass: 5, tension: elementSize.tension, friction: elementSize.friction }} speed={elementSize.speed}>
            <mesh ref={meshRef} position={[0, 0, 0]}>
                <Sphere args={[elementSize.earthSize, 100, 100]} ref={earthRef} >
                    <atmosphereMaterial map={map} />
                </Sphere>
            </mesh>
        </PresentationControls>
    );
};



export default React.memo(Earth);