import React, { Suspense } from 'react';
import * as three from 'three';
import { Loader, ContactShadows, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useControls, folder } from 'leva';
// * Components
import Skateboard from './Skateboard'
import ColorPicker from './ColorPicker'
import Floor from './Floor';
import Lights from './Lights'
import Stage from './Stage'
import TextContainer from './TextContainer'

const Scene = () => {

    const cameraParams = useControls({
        camera: folder({
            cameraX: { value: 0, min: 0, max: 10, step: .01 },
            cameraY: { value: -2, min: -7, max: 10, step: .01 },
            cameraZ: { value: 8.5, min: 0, max: 30, step: .01 },
        })
    });

    return (
        <>
            <div style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, outline: 'none' }} >
                <Canvas
                    gl={{
                        antialias: true,
                        toneMapping: three.NoToneMapping
                    }}
                    shadows
                    color='white'
                    camera={{
                        position: [cameraParams.cameraX, cameraParams.cameraY, cameraParams.cameraZ]
                    }}
                >
                    <Suspense fallback={null}>
                        {/* <OrbitControls /> */}
                        <Skateboard />
                        <Floor />
                        <Stage />
                        <Lights />
                        <TextContainer />
                    </Suspense>
                </Canvas>
                <Loader />
            </div>
            {/* <ColorPicker /> */}
        </>
    )
}



export default Scene;