import React, { Suspense } from 'react';
import * as three from 'three';
import { Loader } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import Skateboard from './Skateboard'

const SkateparkCanvas = () => {



    return (
        <div style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, outline: 'none' }} >
            <Canvas shadows camera={{ position: [0, 2, 8] }}>
                <Suspense fallback={null}>
                    <Skateboard />
                </Suspense>
            </Canvas>
            <Loader />
        </div>
    )
}

export default SkateparkCanvas;