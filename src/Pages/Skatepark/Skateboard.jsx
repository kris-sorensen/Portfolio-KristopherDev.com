import React, { useRef } from 'react';
import * as three from 'three';
import { OrbitControls, Plane, SpotLight, useHelper, Float } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import { Model } from './Model'
import Floor from './Floor'

const Skateboard = () => {
    const skateboard = useRef(null)
    useFrame(() => {
        // skateboard.current.rotation.y += .001
        // skateboard.current.rotation.x += .0005
        // skateboard.current.rotation.z -= .0005
    })



    return (
        <>
            <ambientLight intensity={.001} />
            <Lights />
            <OrbitControls />
            {/* <Float
                scale={0.75} position={[0, 0.65, 0]} rotation={[0, 0.6, 0]}
            > */}

            <mesh ref={skateboard} rotation={[Math.PI / 6, Math.PI / 1.8, Math.PI / 116]} scale={.01} position={[0, 0, 0]} >
                <Model />

            </mesh>
            {/* </Float> */}
            <Floor args={[10, 10]} mirror={1} blur={[500, 100]} mixBlur={12} mixStrength={1.5} rotation={[-Math.PI / 2, 0, Math.PI / 2]} position-y={-1} color={'black'} />
        </>
    )
}

function Lights() {
    const light = useRef()
    // useHelper(light, three.SpotLightHelper, 'red')


    return <pointLight

        ref={light}
        intensity={0.3}
        angle={Math.PI / 10}
        distance={6}
        position={[0, 3, 0]}
        // color={'red'}
        // shadow-mapSize-width={64}
        // shadow-mapSize-height={64}
        castShadow
    // shadow-bias={-0.001}
    />
}


export default Skateboard;