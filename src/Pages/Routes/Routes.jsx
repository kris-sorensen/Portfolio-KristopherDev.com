import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
const Connect = React.lazy(() => import("../Connect/Connect"));
const About = React.lazy(() => import("../About/About"));
const Skatepark = React.lazy(() => import('../Skatepark/Skatepark'));



const RouteHandler = () => {
    return (
        <Suspense fallback={<p>Loading...</p>} >
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/connect' element={<Connect />} />
                <Route path='/skatepark' element={<Skatepark />} />
            </Routes>
        </Suspense>
    );
}
export default RouteHandler;