import * as THREE from 'three';
import React, { Suspense } from 'react';
import { Canvas, extend } from '@react-three/fiber';
import { Loader, Plane } from '@react-three/drei';

// import AboutContent from './AboutContent';
import Simon from './Simon';
import Background from './Background';
// import Rules from './Rules';

import Firstname from './Firstname';
import Lastname from './Lastname';
import Title from './Title';
import Content from './Content';
import Rules from './Rules';

import { EffectComposer, SelectiveBloom, Selection, Select, } from '@react-three/postprocessing';




function AboutCanvas() {
    return (
        <Canvas>
            <Suspense fallback={ <Loader /> }>
                <Background />
                <Rules />
                {/* <AboutContent /> */ }
                <Firstname />
                <Lastname />
                {/* <Btn /> */ }
                <Content />
                <Title />

                <Selection >
                    <Select enabled={ true }>
                        <Simon />
                    </Select>
                    <EffectComposer multisampling={ 8 }>
                        <SelectiveBloom kernelSize={ 3 } luminanceThreshold={ 0 } luminanceSmoothing={ 0.4 } intensity={ .9 } />

                    </EffectComposer>
                </Selection>
                <ambientLight intensity={ .2 } />
            </Suspense>
        </Canvas>
    );
}

export default AboutCanvas;