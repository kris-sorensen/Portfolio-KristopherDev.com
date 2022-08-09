import { Loader, OrbitControls, Effects } from "@react-three/drei";
import { Canvas, MeshProps } from '@react-three/fiber';
import React, { Suspense, useState, useLayoutEffect } from 'react';
import Fireworks from "./Fireworks";
import './styles/about.css';
import SemiTransparentLayer from './SemiTransparentLayer';

// type psychedelicBallsProps={

//     // x: number,
//     // y: number,
//     // z: number;



// };


function AboutCanvas() {
    let count = 1
    const [fireworks, setFireworks] = useState([<Fireworks position={[0, 0]} key={count} />])

    // mouse position gets passed into fireworks onClick events

    // useState with Array

    // hanlde click which puts new element in array.

    // when opacity reaches 0 I want to trigger its removal from the array

    // render state array

    // add one to count when you add firework to arr

    const handleClick = event => {
        // count = count + 1;
        // console.log(count)
        //get mouse position
        // Convert pixel location of mouse into Canvas location
        const x = ((event.clientX / window.innerWidth) * 2 - 1)
        const y = (-(event.clientY / window.innerHeight) * 2 + 1)
        setFireworks([...fireworks, <Fireworks position={[x, y]} key={Date.now()} />])
        // add to fireworks array. pass in location
    }

    return (
        <div style={{ height: '95%', width: '100%' }} className="canvas-container">
            <Canvas onClick={handleClick} gl={{ gamaOutput: true, autoClearColor: false, preserveDrawingBuffer: true, }} orthographic camera={{ zoom: 100, position: [0, 0, 50] }}>
                <OrbitControls />
                <SemiTransparentLayer />
                <Effects multisamping={8} renderIndex={1} disableGamma={false} disableRenderPass={false} disableRender={false}>
                </Effects>
                <Suspense fallback={null} >
                    {fireworks}
                </Suspense>
            </Canvas>
            <Loader />
        </div>
    );
}

export default AboutCanvas;