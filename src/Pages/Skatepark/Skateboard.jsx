import React, { useRef, Suspense } from 'react';
import * as three from 'three';
import { OrbitControls } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import { useControls, folder } from 'leva';
import { PresentationControls } from '@react-three/drei';
import './styles/skateboard.css'
// * Components
import Floor from './Floor'
import { SkateboardModel } from './SkateboardModel'



const Skateboard = () => {
    const skateboard = useRef(null)
    const presControls = useRef(null)
    // useFrame((state) => {
    //     const t = state.clock.getElapsedTime()
    //     if (skateboard.current == null) return
    // })

    const params = useControls({
        skateboard: folder({
            x: { value: 0, min: -20, max: 20, step: .01 },
            y: { value: -.5, min: -20, max: 20, step: .01 },
            z: { value: 0, min: -20, max: 20, step: .01 },
            rotationX: { value: 0, min: 0, max: Math.PI * 2, step: .01 },
            rotationY: { value: 4, min: 0, max: Math.PI * 2, step: .01 },
            rotationZ: { value: .6, min: 0, max: Math.PI * 2, step: .01 },
        })
    });

    return (
        <>
            {/* <ambientLight intensity={.1} /> */}
            <OrbitControls
                enableRotate={false}
                maxDistance={8}
                minDistance={6}
            />
            <PresentationControls
                ref={presControls}
                global={true}
                cursor={true}
                snap={false}
                speed={4}
                zoom={1}
                rotation={[params.rotationX, params.rotationY, params.rotationZ]} // Default rotation
                polar={[-Math.PI / 1.5, Math.PI / 2]}
                azimuth={[-Infinity, Infinity]}
                config={{ mass: 1, tension: 10, friction: 8 }}
            >

                <Suspense fallback={null} >
                    <group
                        ref={skateboard}
                        scale={.007}
                        position={[params.x, params.y, params.z]}
                    >
                        <SkateboardModel />
                    </group>
                </Suspense>
            </PresentationControls>

        </>
    )
}




export default React.memo(Skateboard);