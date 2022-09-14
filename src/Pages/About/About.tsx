import { Loader } from '@react-three/drei';
import React, { Suspense } from 'react';
import AboutCanvas from './AboutCanvas';



const About = () => {
    return (
        <Suspense fallback={ <Loader /> }>
            <AboutCanvas />
        </Suspense>
    );
};








export default About;
