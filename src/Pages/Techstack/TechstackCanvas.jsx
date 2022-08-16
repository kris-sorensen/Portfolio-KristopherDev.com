import { Canvas, extend } from '@react-three/fiber';
import React from 'react';
import './styles/techstack.css';
import { useControls, Leva } from 'leva';
import Spiral from './Spiral'

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
        <div style={{ height: '95%', width: '100%' }} className="canvas-container">
            <Leva hidden />
            <Canvas gl={{}} camera={{ position: [0, 0.2, .75] }}>
                <Spiral />
            </Canvas>
        </div>
    );
}

export default TechstackCanvas;