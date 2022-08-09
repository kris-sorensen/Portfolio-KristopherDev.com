import * as THREE from 'three';
import {Canvas, useThree} from "@react-three/fiber";
import {useControls, Leva} from 'leva';
import React, {Suspense} from 'react';
import useWindowResize from '../../hooks/useWindowResize';
import '../../App.css';
import {Loader, CameraShake} from '@react-three/drei';
// Components
import StarsContainer from "./CanvasComponents/Stars";
import Earth from "./CanvasComponents/Earth";
import Atmosphere from "./CanvasComponents/Atmosphere";
const Airplanes=React.lazy(() => import("./CanvasComponents/Airplanes"));
// import Loader from '../../utils/loader';


/* TODO
 * add shadow boundaries if needed
 * add sharpness to earth texture (reading list)
 * hide GUI 
 * Add dynamic font adjust
 * Make subtile text more visable
 * change name font
 * Ocular?
 */


const CanvasContainer=() => {
    const elementSize=useWindowResize();

    return (
        <>
            <Canvas gl={{antialias: true, toneMapping: THREE.NoToneMapping}}
                linear >
                <Leva hidden />
                {/* <CameraShake
                    maxYaw={0.03} // Max amount camera can yaw in either direction
                    maxPitch={0.03} // Max amount camera can pitch in either direction
                    maxRoll={0} // Max amount camera can roll in either direction
                    yawFrequency={0.1} // Frequency of the the yaw rotation
                    pitchFrequency={0.1} // Frequency of the pitch rotation
                    rollFrequency={0.1} // Frequency of the roll rotation
                    intensity={1} // initial intensity of the shake
                    decayRate={0.65} // if decay = true this is the rate at which intensity will reduce at />
                /> */}
                {/* <OrbitControls /> */}
                <CameraContainer />
                <Suspense fallback={null} >
                    <Earth />
                    <Atmosphere />
                    <StarsContainer />
                    <Lights />
                    {/* <THREE.Raycaster normalize /> */}
                </Suspense >

                <Airplanes />
                <Airplanes />
                <Airplanes />
                <Airplanes />
                <Airplanes />
                <Airplanes />

            </Canvas >
            <Loader />
        </>
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

    return ( // todo: return null here instead
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