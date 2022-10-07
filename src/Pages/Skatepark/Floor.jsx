import * as THREE from 'three'
import React from 'react'
import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber'
import { useTexture, Reflector, Plane } from '@react-three/drei';

function Floor(props) {
    // const [floor, normal] = useTexture(['/SurfaceImperfections003_1K_var1.jpg', '/SurfaceImperfections003_1K_Normal.jpg'])
    return (
        <mesh >
            <Plane  {...props} receiveShadow>
                <meshStandardMaterial roughness={.6} metalness={1} color={'white'} />
            </Plane>
        </mesh>
        // <Reflector resolution={1024} args={[8, 8]} {...props}>
        //     {(Material, props) => <Material color="#f0f0f0" metalness={0} roughnessMap={floor} normalMap={normal} normalScale={[2, 2]} {...props} />}
        // </Reflector>
    )
}

export default Floor