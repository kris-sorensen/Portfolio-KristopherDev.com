import React, { Suspense } from 'react';
import * as three from 'three';
import { Loader, OrbitControls, Preload } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useControls, folder, Leva } from 'leva';
// * Components
import Skateboard from './Skateboard'
import ColorPicker from './ColorPicker'
import Floor from './Floor';
import Lights from './Lights'
import Stage from './Stage'
import TextContainer from './TextContainer'
import EffectsContainer from './Effects'
import Cursor from './Cursor';
import BackgroundGrad from './BackgroundGrad'
import Title from './Title';

const Scene = () => {

    const cameraParams = useControls({
        camera: folder({
            cameraX: { value: 0, min: 0, max: 10, step: .01 },
            cameraY: { value: -2, min: -7, max: 10, step: .01 },
            cameraZ: { value: 6.5, min: 0, max: 30, step: .01 },
        })
    });

    return (
        <>
            <div style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, outline: 'none' }} >
                <Leva hidden />
                <Canvas
                    gl={{
                        antialias: true,
                        toneMapping: three.NoToneMapping
                    }}
                    dpr={2}
                    shadows
                    color='white'
                    camera={{
                        fov: 75,
                        position: [cameraParams.cameraX, cameraParams.cameraY, cameraParams.cameraZ]
                    }}
                >
                    <OrbitControls
                        enableRotate={false}
                        maxDistance={7.5}
                        minDistance={4.8}
                        enablePan={false}
                    />
                    <Suspense fallback={null}>
                        <Preload all />
                        {/* <OrbitControls /> */}
                        <Skateboard />
                        <BackgroundGrad />
                        {/* <Floor /> */}
                        {/* <Stage /> */}
                        <Lights />
                        {/* <TextContainer /> */}
                        <Cursor />
                        {/* <EffectsContainer /> */}
                    </Suspense>
                </Canvas>
                <Loader />
            </div>
            <ColorPicker />
            <Title />
        </>
    )
}



export default React.memo(Scene);