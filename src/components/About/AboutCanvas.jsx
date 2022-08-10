import { Loader, OrbitControls, Effects } from "@react-three/drei";
import { Canvas, MeshProps } from '@react-three/fiber';
import React, { Suspense, useState, useLayoutEffect } from 'react';
import Fireworks from "./Fireworks";
import './styles/about.css';
import SemiTransparentLayer from './SemiTransparentLayer';
import { useMousePosition } from './../../hooks/useMousePosition';
import Title from './Title';

function AboutCanvas() {
    const [fireworks, setFireworks] = useState([])
    const [velocity, setVelocity] = useState(1)
    const [gravity, setGravity] = useState(.001)
    const [opacity, setOpacity] = useState(.01)
    const [count, setCount] = useState(500)

    // when opacity reaches 0 I want to trigger its removal from the array

    const handleClick = () => {
        setFireworks([...fireworks, <Fireworks velocity={velocity} gravity={gravity} opacity={opacity} count={count} key={Date.now()} />])
    }

    return (
        <div style={{ height: '95%', width: '100%' }} className="canvas-container">
            <Canvas onClick={handleClick} gl={{ gamaOutput: true, autoClearColor: false, preserveDrawingBuffer: true, }} orthographic camera={{ zoom: 100, position: [0, 0, 5] }}>
                <Suspense fallback={null} >
                    {/* <OrbitControls /> */}
                    <SemiTransparentLayer />
                    <Effects multisamping={8} renderIndex={1} disableGamma={false} disableRenderPass={false} disableRender={false}>
                    </Effects>
                    <Title />

                    {fireworks}
                </Suspense>
            </Canvas>
            <Loader />
        </div>
    );
}

export default AboutCanvas;