import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import Loader from '../../utils/loader'
const Connect = React.lazy(() => import("../Connect/Connect"));
// const Techstack = React.lazy(() => import("../Techstack/Techstack"));
// const Main = React.lazy(() => import("../Main/About"));
import Test from '../test'


const RouteHandler = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/connect' element={<Connect />} />
            <Route path='/test' element={<Test />} />
            {/* <Route path='/techstack' element={
                <Suspense fallback={Loader}>
                    <Techstack />
                </Suspense>
            } /> */}

        </Routes>
    );
}
export default RouteHandler;