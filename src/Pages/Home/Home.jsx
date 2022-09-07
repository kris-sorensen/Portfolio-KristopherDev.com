
import React, { Suspense } from 'react';
import './styles/home.css';
import HomeCanvas from './HomeCanvas';
import Navbar from '../Portals/Navbar';
// import AboutContent from './AboutContent';
import About from '../About/About';
import Loader from '../../utils/loader'

import Test from '../test'

const Home = () => {

    return (
        <Suspense fallback={Loader}>
            <div className="Home">
                <Navbar />
                <HomeCanvas />
                <About />

                {/* <HomeContent /> */}
            </div>
        </Suspense>
    );
};

export default Home;