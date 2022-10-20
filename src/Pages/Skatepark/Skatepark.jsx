import React, { Suspense } from 'react';
import { Loader } from '@react-three/drei';
// * Components
import Scene from './SkateparkScene'
import HTMLContainer from './HTMLContainer';


const Skatepark = () => {

    return (
        <>
            <Suspense fallback={null}>
                <Scene />
                <HTMLContainer />
            </Suspense>
            <Loader />
        </>
    )
}


export default Skatepark;