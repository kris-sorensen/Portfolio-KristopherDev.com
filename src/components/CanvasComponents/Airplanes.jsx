import React, { useState } from 'react';
import * as THREE from "three";
import { useControls } from 'leva'
import { useLoader, useThree } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useTexture } from "@react-three/drei";
// import makePlane from './makePlane';

// Todo:
// use Low on detailed on airplanes when loading, drei, 
// Draco compress

const Airplanes = () => {
    // Airplane Model
    const plane = useLoader(GLTFLoader, '/airplane.glb').scene.children[0]
    // Trail Texture
    const airplaneTrail = useTexture('/planeTrails.png')
    // Array of plane data
    // const [planesData, setPlanesData] = useState([])
    const { scene } = useThree()
    console.log(scene, 'scene')


    const planeParams = useControls({
        planeSpeed: { value: .4, min: 0, max: 3, step: .01 },
        numberOfPlanes: { value: 8, min: 0, max: 100, step: 1 },
    })

    const meshParams = useControls({
        roughness: { value: .4, min: 0, max: 1, step: .01 },
        transparent: true,
        metalness: { value: 0, min: 0, max: 1, step: 0.01 },
        opacity: { value: 1, min: 0, max: 1, step: .01 },
    })

    // Create X amount of airplanes and add them to scene
    // for (let i = 0; i < planeParams.numberOfPlanes; i++) {
    //     const planes = makePlane(plane, airplaneTrail, scene)
    //     planesData.push(planes)
    // }


    return (
        <mesh>
            <planeGeometry recieveShadow castShadow>
                <meshStandardMaterial {...meshParams} alphaMap={plane} color={[1, 1, 1]} />
            </planeGeometry>
        </mesh>
    );
}


export default Airplanes