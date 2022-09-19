import * as THREE from 'three';
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader, Scroll, ScrollControls } from '@react-three/drei';

import Simon from './Simon';
import Background from './Background';

import Firstname from './Firstname';
import Lastname from './Lastname';
import Title from './Title';
import Content from './Content';
import Btn from './Btn';

import './styles/about.css';

import { EffectComposer, SelectiveBloom, Selection, Select, } from '@react-three/postprocessing';
import LeftsideGraphic from './LeftsideGraphic';

import useWindowSize from '../../hooks/useWindowSize';


function AboutCanvas() {

    const { width, height } = useWindowSize();
    return (
        <div style={ { width: '100%', height: width! > 900 ? '100vh' : '100vh', position: 'fixed', top: 0, left: 0, outline: 'none', overflow: "scroll" } } >
            <Canvas>
                <Suspense fallback={ <Loader /> }>
                    {/* <ScrollControls pages={ width! > 900 ? 1 : 2 }> */ }

                    <Background />
                    {/* <Scroll> */ }
                    <Firstname />
                    { width! > 900 ? <Lastname /> : null }
                    <Btn />
                    <Content />
                    { width! > 900 ? <Title /> : null }
                    <LeftsideGraphic />
                    <Selection >
                        <Select enabled={ true }>
                            <Simon />
                        </Select>
                        <EffectComposer multisampling={ 1 }>
                            <SelectiveBloom
                                kernelSize={ 3 } luminanceThreshold={ .01 } luminanceSmoothing={ 0.4 } intensity={ .1 } />
                        </EffectComposer>

                    </Selection>
                    {/* </Scroll> */ }

                    {/* </ScrollControls> */ }
                </Suspense>
            </Canvas>
        </div>
    );
}


export default AboutCanvas;