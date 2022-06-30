import * as THREE from 'three'
import { Canvas, useThree } from "@react-three/fiber";
import { useControls, Leva } from 'leva';
import React, { Suspense, createContext, useState, useEffect, useLayoutEffect } from 'react';
import { Html, useProgress, OrbitControls } from '@react-three/drei'
import useWindowSize from '../hooks/useWindowSize'
// Components
import StarsContainer from "./CanvasComponents/Stars";
import Earth from "./CanvasComponents/Earth";
import Atmosphere from "./CanvasComponents/Atmosphere";
const Airplanes = React.lazy(() => import("./CanvasComponents/Airplanes"));

/* TODO
 * add shadow boundaries if needed
 * add sharpness to earth texture (reading list)
 * hide GUI 
 * Add dynamic font adjust
 * Make subtile text more visable
 * change name font
 * Ocular?
 */

export const RadiusContext = createContext()

function Loader() {
    const { progress } = useProgress()
    return <Html center>{progress} % loaded</Html>
}

const CanvasContainer = () => {
    // Hooks
    const { earthSize } = useWindowSize();
    const [earthRadius, setEarthRadius] = useState();

    // Set Earth Size
    useLayoutEffect(() => {
        function handleEarthSize() {
            setEarthRadius(earthSize)
        }
        handleEarthSize()
    })

    return (
        <Canvas gl={{ antialias: true, toneMapping: THREE.NoToneMapping }}
            linear >
            <Leva hidden />
            {/* <OrbitControls /> */}
            <RadiusContext.Provider value={[earthRadius, setEarthRadius]} >
                <CameraContainer />
                <Suspense fallback={<Loader />} >
                    <Earth />
                    <Atmosphere />
                    <StarsContainer />
                    <Lights />
                </Suspense >

                <Airplanes />
                <Airplanes />
                <Airplanes />
                <Airplanes />
                <Airplanes />
                <Airplanes />

            </RadiusContext.Provider>
        </Canvas >
    )
}

const CameraContainer = () => {
    const cameraParams = useControls({
        zPosition: { value: 50, min: 5, max: 300, step: 1 },
        fov: { value: 45, min: 5, max: 135, step: 1 },
    })

    useThree(({ camera }) => {
        camera.fov = cameraParams.fov
        camera.position.z = cameraParams.zPosition;
        camera.updateProjectionMatrix()
    });

    return (
        <>
        </>
    )
}

const Lights = () => {
    const lightParams = useControls({
        intensity: { value: 2, min: 0, max: 5, step: .01 },
        position: { value: [0, 0, 10], min: 0, max: 30, step: .1 }
    })
    return (
        <>
            <directionalLight castShadow {...lightParams} color={"#fff"} />
            <pointLight position={[0, 0, 40]} color={0xffffff} intensity={0.8} />
        </>
    )
}

export default CanvasContainer; 