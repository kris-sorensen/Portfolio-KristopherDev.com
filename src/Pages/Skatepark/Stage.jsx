import React from 'react';
import * as three from 'three';
import { Box, Cylinder, Plane } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useControls } from 'leva';

const Stage = () => {

    const { cylinderY } = useControls({
        cylinderY: { value: -3.4, min: -4, max: 5, step: .001 },
    });

    return (
        <mesh
            castShadow
            receiveShadow
            position={[0, cylinderY, 0]}
        >
            <Cylinder
                args={[2.2, 2.2, .2, 64, 64]}
            >
                <meshStandardMaterial
                    color={'white'}
                    roughness={0}
                    metalness={.75}
                    blending={three.NormalBlending}
                />
            </Cylinder>
        </mesh>
    )
}

export default Stage;