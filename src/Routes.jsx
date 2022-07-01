import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About.tsx'


const RouteHandler = () => {
    const hello = 2
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About hello={hello} />} />
        </Routes>
    );
}
export default RouteHandler;