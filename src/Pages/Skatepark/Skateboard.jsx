import React, { useRef, Suspense } from 'react';
import * as three from 'three';
import { OrbitControls, Plane, SpotLight, useHelper, Float, softShadows, Html, Box, ContactShadows } from '@react-three/drei';
import { useThree, useFrame, extend } from '@react-three/fiber';
// import { Model } from './Model'
import Floor from './Floor'
import { PresentationControls } from '@react-three/drei';
import './styles/skateboard.css'
import { SkateboardModel } from './SkateboardModel'
import { useControls } from 'leva';






const Skateboard = () => {
    const skateboard = useRef(null)
    const presControls = useRef(null)
    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        // skateboard.current.rotation.x = -Math.PI / 1.75 + Math.cos(t / 4) / 8
        if (skateboard.current == null) return
        // console.log(skateboard.current)
        // skateboard.current.rotation.y += .003
        // skateboard.current.position.y = (1 + Math.sin(t / 1.5)) / 10
        // skateboard.current.rotation.z = (1 + Math.sin(t / 20))
    })

    const params = useControls({
        x: { value: 0, min: -20, max: 20, step: .01 },
        y: { value: -.5, min: -20, max: 20, step: .01 },
        z: { value: 0, min: -20, max: 20, step: .01 },
        rotationX: { value: 0, min: 0, max: Math.PI * 2, step: .01 },
        rotationY: { value: 4, min: 0, max: Math.PI * 2, step: .01 },
        rotationZ: { value: .6, min: 0, max: Math.PI * 2, step: .01 },
    });




    return (
        <>
            {/* <ambientLight intensity={.1} /> */}

            <OrbitControls enableRotate={false} maxDistance={8} minDistance={6} />
            <PresentationControls
                ref={presControls}
                global={true} // Spin globally or by dragging the model
                cursor={true} // Whether to toggle cursor style on drag
                snap={false} // Snap-back to center (can also be a spring config)
                speed={4} // Speed factor
                zoom={1} // Zoom factor when half the polar-max is reached
                rotation={[params.rotationX, params.rotationY, params.rotationZ]} // Default rotation
                polar={[-Math.PI / 1.5, Math.PI / 2]} // Vertical limits
                azimuth={[-Infinity, Infinity]} // Horizontal limits
                config={{ mass: 1, tension: 10, friction: 8 }} // Spring config
            >

                <Suspense fallback={null} >
                    <mesh
                        ref={skateboard}
                        // rotation={[0, 0, 0]}
                        scale={.007}
                        position={[params.x, params.y, params.z]}
                    >
                        <SkateboardModel />

                        {/* <Box args={[4, 4, 4]} recieveShadow castShadow>
                            <meshStandardMaterial />
                        </Box> */}


                    </mesh>
                </Suspense>
            </PresentationControls>

        </>
    )
}




export default React.memo(Skateboard);