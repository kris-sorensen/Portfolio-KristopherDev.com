import * as THREE from 'three';
import {Canvas, useThree} from "@react-three/fiber";
import {useControls, Leva} from 'leva';
import React, {Suspense} from 'react';
import {Html, useProgress} from '@react-three/drei';
import useWindowResize from '../hooks/useWindowResize';
import '../App.css';
// Components
import StarsContainer from "./CanvasComponents/Stars";
import Earth from "./CanvasComponents/Earth";
import Atmosphere from "./CanvasComponents/Atmosphere";
const Airplanes=React.lazy(() => import("./CanvasComponents/Airplanes"));
import useTabActive from '../hooks/useTabActive';


/* TODO
 * add shadow boundaries if needed
 * add sharpness to earth texture (reading list)
 * hide GUI 
 * Add dynamic font adjust
 * Make subtile text more visable
 * change name font
 * Ocular?
 */


function Loader() {
    const {progress}=useProgress();
    return <Html center>{progress} % loaded</Html>;
}

const CanvasContainer=() => {
    const elementSize=useWindowResize();
    const needsPageReload=useTabActive();

    return (
        <Canvas gl={{antialias: true, toneMapping: THREE.NoToneMapping}}
            linear >
            <Leva hidden />
            {/* <OrbitControls /> */}
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

        </Canvas >
    );
};

const CameraContainer=() => {
    const elementSize=useWindowResize();
    const cameraParams=useControls({
        zPosition: {value: 50, min: 5, max: 300, step: 1},
        fov: {value: 45, min: 5, max: 135, step: 1},
        yPosition: {value: 0, min: -40, max: 40, step: .001},
        xPosition: {value: 0, min: -40, max: 40, step: .001},
    });

    useThree(({camera}) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: Only checking for properties of Orthographic Camera not the perspective camera it is
        camera.fov=cameraParams.fov;

        camera.position.z=cameraParams.zPosition;
        camera.position.y=elementSize.cameraY;
        camera.position.x=cameraParams.xPosition;
        // camera.lookAt(0, elementSize.y, 0)
        camera.updateProjectionMatrix();
    });

    return (
        <>
        </>
    );
};

const Lights=() => {
    const lightParams=useControls({
        intensity: {value: 2, min: 0, max: 5, step: .01},
        position: {value: [0, 0, 10], min: 0, max: 30, step: .1}
    });
    return (
        <>
            <directionalLight castShadow {...lightParams} color={"#fff"} />
            <pointLight position={[0, 0, 40]} color={0xffffff} intensity={0.8} />
        </>
    );
};

export default CanvasContainer; 