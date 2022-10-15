import React from 'react';
import * as three from 'three';
import { Plane, GradientTexture } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

const Background = () => {
    const { viewport } = useThree()


    return (
        <mesh position={[0, 0, -10]} >
            <Plane args={[viewport.width * 5, viewport.height * 5]}>
                <meshBasicMaterial>
                    <GradientTexture
                        stops={[0, .54, .88, 1]} // As many stops as you want
                        colors={['black', 'black', '#222222', '#ffffff']} // Colors need to match the number of stops
                        size={1024} // Size is optional, default = 1024
                    />

                </meshBasicMaterial>
            </Plane>
        </mesh>
    )
}

export default Background;