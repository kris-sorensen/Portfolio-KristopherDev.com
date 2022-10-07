
import React, { Suspense } from 'react';
import './styles/home.css';
import HomeCanvas from './HomeCanvas';
import Navbar from '../Portals/Navbar';
// import Loader from '../../utils/loader'
import { Loader } from '@react-three/drei';

const Home = () => {

    return (
        <>
            <Suspense fallback={null}>
                <Navbar color={'white'} />
                <HomeCanvas />
            </Suspense>
            <Loader />
        </>
    );
};

export default Home;