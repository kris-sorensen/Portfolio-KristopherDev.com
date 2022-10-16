import React, { useRef } from 'react';
import * as three from 'three';
import { Plane, Ring, Sphere } from '@react-three/drei';
import { useThree, useFrame, extend } from '@react-three/fiber';
import PaintMaterial from '../../shaders/halo';
import { useControls } from 'leva';
import useSkateboardStore from './../../stores/useSkateboardStore';

extend({ PaintMaterial })

const Cursor = () => {
    const { viewport } = useThree()

    const mesh = useRef(null)
    const halo = useRef(null)
    const { selectedColor } = useSkateboardStore()

    useFrame(({ mouse }) => {
        const x = (mouse.x * viewport.width) / 2
        const y = (mouse.y * viewport.height) / 2
        mesh.current.position.set(x, y, 0)
        // mesh.current.rotation.set(0, 0, y)



        // halo.current.uniforms.uSpread.value = .20
    })
    const { rx, ry, rz } = useControls({
        rx: { value: .24, min: -Math.PI * 2, max: Math.PI * 2, step: .001 },
        ry: { value: 0, min: -Math.PI * 2, max: Math.PI * 2, step: .001 },
        rz: { value: 0, min: -Math.PI * 2, max: Math.PI * 2, step: .001 },
    });

    return (
        <mesh ref={mesh} position={[0, 0, 4]} rotation={[rx, ry, rz]} >
            {/* <Points args={[.3]}
            >
                
            </Points> */}
            <points>
                <ringGeometry args={[.3, .4, 30, 30]} />

                <pointsMaterial size={3} sizeAttenuation={false}
                    color={selectedColor}
                />
                {/* <PointMaterial transparent vertexColors size={15} sizeAttenuation={false} depthWrite={false} /> */}
            </points>

        </mesh>
    )
}

export default Cursor;