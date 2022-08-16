import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, extend } from '@react-three/fiber';
import PropTypes from 'prop-types';
// import { useThree } from '@react-three/fiber';
// import useStore from '../../hooks/useStore'
import { shaderMaterial } from '@react-three/drei';
import glsl from 'babel-plugin-glsl/macro.js';


const Spiral = () => {
    // const { mouse, viewport, gl, clock } = useThree()
    const meshRef = useRef()


    let clockOffset = 0
    useEffect(({ clock }) => {
        //offset Running clock so it starts at zero for each new firework
        clockOffset = clock.getElapsedTime()

    }, []);


    return (
        <>
            <mesh ref={meshRef}>


            </mesh>
        </>
    );
};



Spiral.propTypes = {

};

const SpiralMaterial =
    shaderMaterial(
        {


        },

        // vertex shader
        glsl`
           `,
        // fragment shader
        glsl`
        `

    );


extend({ SpiralMaterial });



export default Spiral;