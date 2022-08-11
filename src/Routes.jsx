import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Loader from './utils/loader'
const About = React.lazy(() => import("./components/About/About"));


const RouteHandler = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={
                <Suspense fallback={Loader}>
                    <About />
                </Suspense>
            } />
        </Routes>
    );
}
export default RouteHandler;