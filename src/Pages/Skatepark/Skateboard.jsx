import React, { useRef, Suspense, useState } from 'react';
import * as three from 'three';
import { } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useControls, folder } from 'leva';
import { PresentationControls } from '@react-three/drei';
import './styles/skateboard.css'
// * Components
import SkateboardModel from './SkateboardModel'



const Skateboard = () => {
    const skateboard = useRef(null)

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        if (skateboard.current == null) return
        // skateboard.current.rotateOnAxis(new three.Vector3(0, 1, 0), .0001);
        // skateboard.current.rotateOnAxis(new three.Vector3(1, 0, 0), .0005);
        // skateboard.current.rotateOnAxis(new three.Vector3(0, 0, 1), .0003);
    })

    const params = useControls({
        skateboard: folder({
            x: { value: 0, min: -20, max: 20, step: .01 },
            y: { value: -.5, min: -20, max: 20, step: .01 },
            z: { value: 0, min: -20, max: 20, step: .01 },
            rotationX: { value: 2.11, min: 0, max: Math.PI * 2, step: .01 },
            rotationY: { value: 2.48, min: 0, max: Math.PI * 2, step: .01 },
            rotationZ: { value: 2.28, min: 0, max: Math.PI * 2, step: .01 },
            speed: { value: 5, min: 0, max: 30, step: .01 }
        })
    });


    return (
        <>

            <PresentationControls
                global={true}
                cursor={false}
                snap={false}
                speed={params.speed}
                zoom={1}
                rotation={[params.rotationX, params.rotationY, params.rotationZ]}// Default rotation
                polar={[-Infinity, Infinity]}
                azimuth={[-Infinity, Infinity]}
                config={{ mass: 1, tension: 10, friction: 8 }}
            >

                <Suspense fallback={null} >
                    <group
                        ref={skateboard}
                        scale={.007}
                        position={[params.x, params.y, params.z]}
                    // todo: need to fix how pres controls make model spin on first click. maybe do rotation here and then a little farther with pres controls so it moves a little on first click
                    // rotation={[params.rotationX, params.rotationY, params.rotationZ]}
                    >
                        <SkateboardModel
                        />
                    </group>
                </Suspense>
            </PresentationControls>

        </>
    )
}




export default React.memo(Skateboard);