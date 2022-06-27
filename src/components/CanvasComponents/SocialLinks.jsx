import React, { Suspense, useRef } from 'react';
import * as THREE from 'three'
import { useControls, folder } from 'leva';
import { useTexture, Circle } from "@react-three/drei";
import { useThree } from '@react-three/fiber'
// import { motion } from "framer-motion"

const SocialLinks = () => {
    const group = useRef()
    const plus = useRef()
    const linkedIn = useRef()
    const email = useRef()
    const github = useRef()
    const { viewport } = useThree()

    // Textures
    const map = useTexture('/add.png')


    const plusArgs = useControls({
        'plus': folder({
            radius: { value: .66, min: .05, max: 1, step: .001 },
            x: { value: 17.5, min: -viewport.width * 2, max: viewport.width * 2, step: .01 },
            y: { value: -7, min: -viewport.height, max: viewport.height, step: .01 },
            z: { value: 26, min: -50, max: 50, step: .5 },
        })

    })

    return (
        <Suspense fallback={null}>
            <group ref={group} whileHover={{ scale: 2.1 }}>
                <mesh ref={plus} >
                    <Circle args={[plusArgs.radius, 10]} position={[plusArgs.x, plusArgs.y, plusArgs.z]} >
                        <meshBasicMaterial
                            map={map} />
                    </Circle>
                </mesh>
            </group>
        </Suspense>
    );
}

export default SocialLinks;