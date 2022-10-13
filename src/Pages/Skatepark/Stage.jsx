import React from 'react';
import * as three from 'three';
import { Box, Cylinder, Plane, useTexture } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useControls } from 'leva';
// import { normal } from '/skatepark/floor/sewageColor.png'

const Stage = () => {
    // console.log(normal)
    const [sewageCoverColor, sewageCoverNormal, SewageCoverDisp] = useTexture(['/skatepark/floor/sewageColor.png', '/skatepark/floor/sewageNormal.jpg', '/skatepark/floor/sewageDisp.jpg'])

    const { cylinderY, sewageRotateY } = useControls({
        cylinderY: { value: -3.4, min: -4, max: 5, step: .001 },
        sewageRotateY: { value: Math.PI / 2, min: 0, max: Math.PI * 2, step: .001 },
    });

    return (
        <mesh
            castShadow
            receiveShadow
            position={[0, cylinderY, 0]}
            rotation={[0, sewageRotateY, 0]}
        >
            <Cylinder

                args={[2.2, 2.2, .2, 64, 64]}
            >
                <meshStandardMaterial
                    color={'white'}
                    roughness={0}
                    metalness={.75}
                    blending={three.NormalBlending}
                    // map={sewageCoverColor}
                    attach='material'
                    // normalMap={sewageCoverNormal}
                    displacementMap={SewageCoverDisp}
                    displacementScale={.05}

                />
            </Cylinder>
        </mesh>
    )
}

export default Stage;