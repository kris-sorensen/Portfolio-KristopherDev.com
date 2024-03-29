import { Loader } from '@react-three/drei';
import React, { Suspense } from 'react';
// * components
import AboutCanvas from './AboutCanvas';
import Navbar from '../Portals/Navbar';


const About = () => {
    return (
        <>
            <Suspense fallback={ null }>
                <AboutCanvas />
                <Navbar color={ 'black' } />
            </Suspense>
            <Loader />
        </>
    );
};








export default About;
