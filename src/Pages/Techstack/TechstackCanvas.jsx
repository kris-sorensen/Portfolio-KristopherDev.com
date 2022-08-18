import React, { Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, extend } from '@react-three/fiber';
import './styles/techstack.css';
import { useControls, Leva } from 'leva';
import Spiral from './Spiral'
import { Circle, OrbitControls } from '@react-three/drei'

/* TODO:
  * create a new store and place parameters
* add uniforms, shader, and shader properties
* setup points 
* setup attributes
* setup for loop for creating attributes
* setup useFrame

? try less particles but bigger particles
*/

function TechstackCanvas() {

    return (
        <div style={{ height: '100%', width: '100%' }} className="canvas-container">
            <Leva hidden />
            <Canvas gl={{}} camera={{ position: [0, 0.2, .75] }}>
                <OrbitControls />
                <Suspense fallback={null}>
                    <Spiral />
                </Suspense>
            </Canvas>
        </div>
    );
}

export default TechstackCanvas;