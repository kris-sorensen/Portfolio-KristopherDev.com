import React from 'react';
import * as THREE from 'three'

// Creates a semi-transparent Layer over camera that creates a trail effect when renderer/gl is set to: autoClearColor: false, and preserveDrawingBuffer: true
const SemiTransparentLayer = () => {
    return (
        <mesh position={[0, 0, -.1]} >
            <planeGeometry args={[60, 60, 1, 1]} />
            <meshBasicMaterial color='#000000' transparent={true} opacity={.06} />
        </mesh>
    )
}

export default SemiTransparentLayer