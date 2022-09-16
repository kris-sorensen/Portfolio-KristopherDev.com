import { Box, Circle, OrbitControls, Sphere } from '@react-three/drei';
import React from 'react';
import BwMaterial from '../../shaders/bw';
import { extend } from '@react-three/fiber';

extend({ BwMaterial });

function Rules() {
    return (
        <>
            <OrbitControls />
            {/* <mesh>
                <Circle args={ [.6, 50, 50] }> */}

            {/* <bwMaterial uGradientDirection={ false } />
                </Circle>
            </mesh> */}
        </>
    );
}

export default Rules;