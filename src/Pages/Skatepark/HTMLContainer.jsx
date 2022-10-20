import React from 'react';
import './styles/skateboard.css'
// * Hooks
// import { useMediaQuery } from 'react-responsive'
// * Components
import Title from './Title';
import Subtitle from './Subtitle';
import ColorPicker from './ColorPicker';
import Cursor from './Cursor'
import Navbar from '../Portals/Navbar';
import PartsSelector from './PartsSelector';
import useWindowSize from './../../hooks/useWindowSize';

const HTMLContainer = () => {
    const { width } = useWindowSize();
    return (
        <>
            <Navbar />
            <div className="container-skatepark">
                <div className="wrapper-skatepark" >
                    <Title />
                    <Subtitle />
                </div>
            </div>
            <ColorPicker />
            <Cursor />
            {/* {width < 600 && <PartsSelector />} */}
        </>
    )
}



export default HTMLContainer;