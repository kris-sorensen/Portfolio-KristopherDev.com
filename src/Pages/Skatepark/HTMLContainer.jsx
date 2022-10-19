import React from 'react';
import './styles/skateboard.css'
// * Hooks
import useWindowSize from '../../hooks/useWindowSize';
// * Components
import Title from './Title';
import Subtitle from './Subtitle';
import ColorPicker from './ColorPicker';
import Cursor from './Cursor'

const HTMLContainer = () => {

    // const { width } = useWindowSize();

    const Container_Styles = {
        position: 'relative',
        zIndex: 10,
        width: '100%',
        height: '100vh',
        pointerEvents: "none",
        top: '7%'
    }

    const Wrapper_Styles = {
        textAlign: 'center',
    }


    return (
        <>
            <div style={Container_Styles}>
                <div style={Wrapper_Styles}>
                    <Title />
                    <Subtitle />
                </div>
            </div>
            <ColorPicker />
            <Cursor />
        </>
    )
}



export default HTMLContainer;