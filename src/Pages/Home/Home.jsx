
import React, { Suspense } from 'react';
import './styles/home.css';
import HomeCanvas from './HomeCanvas';
import Navbar from '../Portals/Navbar';
import Loader from '../../utils/loader'

const Home = () => {

    return (
        <Suspense fallback={<Loader />}>
            <Navbar color={'white'} />
            <HomeCanvas />
        </Suspense>
    );
};

export default Home;