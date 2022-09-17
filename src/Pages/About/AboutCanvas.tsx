import * as THREE from 'three';
import React, { Suspense } from 'react';
import { Canvas, extend } from '@react-three/fiber';
import { Loader, Plane } from '@react-three/drei';

import Simon from './Simon';
import Background from './Background';

import Firstname from './Firstname';
import Lastname from './Lastname';
import Title from './Title';
import Content from './Content';

import './styles/about.css';


import { EffectComposer, SelectiveBloom, Selection, Select, } from '@react-three/postprocessing';




function AboutCanvas() {
    return (
        <div style={ { width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, outline: 'none' } } >
            <Canvas>
                <Suspense fallback={ <Loader /> }>
                    <Background />

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
                        <EffectComposer multisampling={ 1 }>
                            <SelectiveBloom
                                kernelSize={ 3 } luminanceThreshold={ .01 } luminanceSmoothing={ 0.4 } intensity={ 1.8 } />
                        </EffectComposer>
                    </Selection>
                </Suspense>
            </Canvas>
        </div>
    );
}

export default AboutCanvas;