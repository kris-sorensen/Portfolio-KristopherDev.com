import * as THREE from 'three';
import { Canvas, useThree } from "@react-three/fiber";
import { useControls, Leva } from 'leva';
import React, { Suspense } from 'react';
import useWindowResize from '../../hooks/useWindowResize';
// import {Loader} from '@react-three/drei';
// Components
import StarsContainer from "./Stars";
import Earth from "./Earth";
import OuterAtmosphere from "./OuterAtmosphere";
const Airplanes = React.lazy(() => import("./Airplanes"));
import Loader from '../../utils/loader';


/* TODO
 * add shadow boundaries if needed
 * add sharpness to earth texture (reading list)
 * hide GUI 
 * Add dynamic font adjust
 * Make subtile text more visable
 * change name font
 * Ocular?
 */


const ConnectCanvas = () => {
    const elementSize = useWindowResize();

    return (
        <>
            <Canvas className="connect-canvas" gl={{ antialias: true, toneMapping: THREE.NoToneMapping }}
                linear >
                <Leva hidden />
                <Suspense fallback={Loader}>
                    {/* <OrbitControls /> */}
                    <CameraContainer />

                    <Earth />
                    <OuterAtmosphere />
                    <StarsContainer />
                    <Lights />


                    <Airplanes />
                    <Airplanes />
                    <Airplanes />
                    <Airplanes />
                    <Airplanes />
                    <Airplanes />
                </Suspense>
            </Canvas >
            {/* <Loader /> */}
        </>
    );
};



const CameraContainer = () => {
    const elementSize = useWindowResize();
    const cameraParams = useControls({
        zPosition: { value: 50, min: 5, max: 300, step: 1 },
        fov: { value: 45, min: 5, max: 135, step: 1 },
        yPosition: { value: 0, min: -40, max: 40, step: .001 },
        xPosition: { value: 0, min: -40, max: 40, step: .001 },
    });

    useThree(({ camera }) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: Only checking for properties of Orthographic Camera not the perspective camera it is
        camera.fov = cameraParams.fov;

        camera.position.z = cameraParams.zPosition;
        camera.position.y = elementSize.cameraY;
        camera.position.x = cameraParams.xPosition;
        // camera.lookAt(0, elementSize.y, 0)
        camera.updateProjectionMatrix();
    });

    return null;
};

const Lights = () => {
    const lightParams = useControls({
        intensity: { value: 2, min: 0, max: 5, step: .01 },
        position: { value: [0, 0, 10], min: 0, max: 30, step: .1 }
    });
    return (
        <>
            <directionalLight castShadow {...lightParams} color={"#fff"} />
            <pointLight position={[0, 0, 40]} color={0xffffff} intensity={0.8} />
        </>
    );
};

export default ConnectCanvas; 