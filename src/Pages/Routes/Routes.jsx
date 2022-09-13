import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
const Connect = React.lazy(() => import("../Connect/Connect"));
const About = React.lazy(() => import("../About/About"));
// const Techstack = React.lazy(() => import("../Techstack/Techstack"));
// const Main = React.lazy(() => import("../Main/About"));
// import Test from '../test'


const RouteHandler = () => {
    return (
        <Suspense fallback={<p>Loading...</p>} >
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/connect' element={<Connect />} />
            </Routes>
        </Suspense>
    );
}
export default RouteHandler;