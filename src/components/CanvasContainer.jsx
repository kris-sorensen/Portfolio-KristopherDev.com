import { Canvas } from "@react-three/fiber";
import { useControls } from 'leva';
import React, { Suspense, createContext, useState } from 'react';
import { Html, useProgress, OrbitControls } from '@react-three/drei'
// Components
import StarsContainer from "./CanvasComponents/Stars";
import CameraContainer from "./CanvasComponents/Camera";
import Earth from "./CanvasComponents/Earth";
import Atmosphere from "./CanvasComponents/Atmosphere";
// import Airplanes from "./CanvasComponents/Airplanes";
const Airplanes = React.lazy(() => import("./CanvasComponents/Airplanes"));
// import Airplane from "./CanvasComponents/models/Airplane";

/* TODO
//  * add loading bar to Suspense 
 * add shadow boundaries if needed
 * add sharpness to earth texture (reading list)
 */
//sfc, imr

export const RadiusContext = createContext()

function Loader() {
    const { progress } = useProgress()
    return <Html center>{progress} % loaded</Html>
}

const CanvasContainer = () => {
    const [earthRadius, setEarthRadius] = useState(9.5);
    // Airplane Model
    // const { nodes, materials } = useGLTF('/models/airplane-transformed.glb')

    return (
        <Canvas>
            <OrbitControls />
            <RadiusContext.Provider value={[earthRadius, setEarthRadius]} >
                <Suspense fallback={<Loader />} >
                    {/* <CameraContainer /> */}
                    <Earth />
                    <Atmosphere />
                    <StarsContainer />
                    <Lights />
                </Suspense >
                <Airplanes />
            </RadiusContext.Provider>
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