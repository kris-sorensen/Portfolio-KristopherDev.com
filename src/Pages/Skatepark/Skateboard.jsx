import React, { useRef } from 'react';
import * as three from 'three';
import { useControls, folder } from 'leva';
import { PresentationControls } from '@react-three/drei';
import './styles/skateboard.css'
// * Components
import SkateboardModel from './SkateboardModel'

const Skateboard = () => {
    const skateboard = useRef(null)

    const params = useControls({
        skateboard: folder({
            x: { value: 0, min: -20, max: 20, step: .01 },
            y: { value: -.5, min: -20, max: 20, step: .01 },
            z: { value: 0, min: -20, max: 20, step: .01 },
            rotationX: { value: 4.99, min: 0, max: Math.PI * 2, step: .01 },
            rotationY: { value: 3.86, min: 0, max: Math.PI * 2, step: .01 },
            rotationZ: { value: .62, min: 0, max: Math.PI * 2, step: .01 },
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
                rotation={[params.rotationX, params.rotationY, params.rotationZ]}
                polar={[-Infinity, Infinity]}
                azimuth={[-Infinity, Infinity]}
                config={{ mass: 1, tension: 10, friction: 8 }}
            >
                <group
                    ref={skateboard}
                    scale={.007}
                    position={[params.x, params.y, params.z]}
                >
                    <SkateboardModel />
                </group>
            </PresentationControls>
        </>
    )
}




export default React.memo(Skateboard);