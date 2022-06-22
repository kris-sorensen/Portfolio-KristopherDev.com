import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useControls } from 'leva';
import React, { useState, useRef, Suspense } from 'react';
import { Sphere, useTexture } from "@react-three/drei";
import { Html, useProgress } from '@react-three/drei'
import StarsContainer from "./CanvasComponents/Stars";
import CameraContainer from "./CanvasComponents/Camera";
import Earth from "./CanvasComponents/Earth";
import Atmosphere from "./CanvasComponents/Atmosphere";

/* TODO
 * add loading bar to Suspense 
 * add shadow boundaries if needed
 * 
 */

function Loader() {
    const { progress } = useProgress()
    return <Html center>{progress} % loaded</Html>
}

const CanvasContainer = () => {


    return (
        <Canvas>
            <Suspense fallback={<Loader />} >
                <CameraContainer />
                <Earth />
                <Atmosphere />
                {/* <Airplanes /> */}
                <StarsContainer />
                <Lights />
            </Suspense >
        </Canvas >
    )
}



const Planes = () => {
    const planeParams = useControls({
        planeSpeed: { value: .4, min: 0, max: 3, step: .01 },
        numberOfPlanes: { value: 8, min: 0, max: 100, step: 1 },
    })

    const meshParams = useControls({
        roughness: { value: .4, min: 0, max: 1, step: .01 },
        metalness: { value: 0, min: 0, max: 1, step: .01 },
        transmission: { value: 1, min: 0, max: 1, step: .01 },
        opacity: { value: 1, min: 0, max: 1, step: .01 },
    })
    console.log('planeParams', planeParams)

    return (
        <mesh>
            <planeGeometry recieveShadow castShadow>
                <meshPhysicalMaterial {...meshParams} color={[1, 1, 1]} />
            </planeGeometry>
        </mesh>
    );
}


const Lights = () => {
    const lightParams = useControls({
        intensity: { value: 2, min: 0, max: 5, step: .01 },
        position: { value: [10, 20, 10], min: 0, max: 30, step: .1 }
    })
    return (
        <directionalLight castShadow {...lightParams} />
    )
}





export default CanvasContainer; 