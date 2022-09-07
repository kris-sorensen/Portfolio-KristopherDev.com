import React, { useRef } from 'react';
import * as THREE from 'three'
import { Canvas, extend, useFrame } from '@react-three/fiber'
import TestMaterial from './testMaterial'
import { OrbitControls } from '@react-three/drei';

extend({ TestMaterial })

function test(props) {

    return (null
        // <Canvas>
        //     <Mesh />
        //     <OrbitControls />
        // </Canvas>
    );
}

const Mesh = () => {
    const test = useRef();
    useFrame(({ clock }) => test.current.uniforms.uTime.value = clock.getElapsedTime())
    return (
        <mesh position={[0, 0, 0]}>
            <pointsGeometry />
            {/* <spiralFanMaterial ref={spiralfan} /> */}
            {/* <meshBasicMaterial /> */}
            <testMaterial ref={test} />
        </mesh>
    )
}

export default test;