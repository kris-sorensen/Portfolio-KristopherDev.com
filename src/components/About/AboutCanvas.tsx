import {Loader} from "@react-three/drei";
import {Canvas} from '@react-three/fiber';
import React, {Suspense} from 'react';

function AboutCanvas() {
    return (
        <div>
            <Canvas>
                <Suspense fallback={null} >

                </Suspense >
            </Canvas>
            <Loader />
        </div>
    );
}

export default AboutCanvas;