import * as THREE from 'three';
import React, {Suspense} from 'react';
import {Canvas} from '@react-three/fiber';
import {Loader} from '@react-three/drei';

import AboutContent from './AboutContent';
import Simon from './Simon';

function AboutCanvas() {
    return (
        <Canvas>
            <Suspense fallback={<Loader />}>
                <AboutContent />
                <Simon />
            </Suspense>
        </Canvas>
    );
}

export default AboutCanvas;