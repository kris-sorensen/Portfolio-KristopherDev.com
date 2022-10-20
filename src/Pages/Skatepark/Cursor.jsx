import React from 'react';
import './styles/skateboard.css'
// * Stores
import useSkateboardStore from '../../stores/useSkateboardStore';
// * Hooks
import { useMousePosition } from '../../hooks/useMousePosition';
import useWindowSize from '../../hooks/useWindowSize';

const Cursor = () => {

    const { selectedPart } = useSkateboardStore()
    const { width } = useWindowSize();
    const { x, y } = useMousePosition()

    const Cursor_Styles = {
        left: width > 600 ? x + 15 : '40%',
        top: width > 600 ? y + 15 : '20%',
    }


    return (
        <>
            {width > 600 &&
                <div className="cursor-container" style={Cursor_Styles}>
                    <h1 className="Cursor" >{selectedPart}</h1>
                </div>}
        </>
    )
}


export default Cursor;