import React from 'react';
import useSkateboardStore from './../../stores/useSkateboardStore';
import { useMousePosition } from './../../hooks/useMousePosition';
import './styles/skateboard.css'
import useWindowSize from './../../hooks/useWindowSize';

const CursorHTML = () => {

    const { selectedPart } = useSkateboardStore()
    const { width } = useWindowSize();

    const { x, y } = useMousePosition()

    const Cursor_Styles = {
        // width: "100%",
        height: "5rem",
        color: "white",
        position: "absolute",
        zIndex: 400,
        left: width > 600 ? x + 15 : '60%',
        top: width > 600 ? y + 15 : '65%',
        fontSize: 8,
        pointerEvents: "none",
    }




    return (
        <div style={Cursor_Styles}>
            <h1 className="Cursor" >{selectedPart}</h1>
        </div>
    )
}


export default CursorHTML;