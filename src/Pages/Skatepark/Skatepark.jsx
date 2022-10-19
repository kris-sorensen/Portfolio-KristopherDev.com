import React, { Suspense } from 'react';
// * Components
import Scene from './SkateparkScene'
import { Loader } from '@react-three/drei';
import HTMLContainer from './HTMLContainer';


const Skatepark = () => {

    return (
        <>
            <Suspense fallback={null}>
                <Scene />
                <HTMLContainer />
            </Suspense >
            <Loader />
        </>
    )
}


export default Skatepark;