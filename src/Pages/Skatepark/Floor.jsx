import React from 'react'
import * as THREE from 'three'
import { useTexture, Plane } from '@react-three/drei';
import { useControls } from 'leva';

function Floor(props) {
    // const [floor, normal] = useTexture(['/skatepark/floor/street.jpg', '/skatepark/floor/streetNormal.jpg'])

    const planeParams = useControls({ planeY: { value: -3.4, min: -5, max: 5, step: .001 }, });

    return (
        <mesh >
            <Plane
                recieveShadow
                args={[10, 10, 50, 50]}
                rotation={[-Math.PI / 2, 0, Math.PI / 2]} position-y={planeParams.planeY}
            >
                <meshStandardMaterial
                    roughness={1} metalness={0}
                    color={'white'}

                />
            </Plane>
        </mesh>
    )
}

export default Floor