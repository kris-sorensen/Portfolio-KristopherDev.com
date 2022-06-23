import { Canvas } from "@react-three/fiber";
import { useControls } from 'leva';
import React, { Suspense } from 'react';
import { Html, useProgress } from '@react-three/drei'
// Components
import StarsContainer from "./CanvasComponents/Stars";
import CameraContainer from "./CanvasComponents/Camera";
import Earth from "./CanvasComponents/Earth";
import Atmosphere from "./CanvasComponents/Atmosphere";
import Airplanes from "./CanvasComponents/Airplanes";

/* TODO
 * add loading bar to Suspense 
 * add shadow boundaries if needed
 * add sharpness to earth texture (reading list)
 */
//sfc, imr

function Loader() {
    const { progress } = useProgress()
    return <Html center>{progress} % loaded</Html>
}

const CanvasContainer = () => {

    return (
        <Canvas>
            <Suspense fallback={<Loader />} >
                {/* <CameraContainer /> */}
                <Earth />
                <Atmosphere />
                <Airplanes />
                <StarsContainer />
                <Lights />
            </Suspense >
        </Canvas >
    )
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