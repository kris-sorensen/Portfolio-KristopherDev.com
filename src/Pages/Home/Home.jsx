
import React, { Suspense } from 'react';
import './styles/home.css';
import HomeCanvas from './HomeCanvas';
import Navbar from '../Portals/Navbar';
import Loader from '../../utils/loader'

const Home = () => {

    return (
        <Suspense fallback={<Loader />}>
            <div className="Home">
                <Navbar />
                <HomeCanvas />
            </div>
        </Suspense>
    );
};

export default Home;