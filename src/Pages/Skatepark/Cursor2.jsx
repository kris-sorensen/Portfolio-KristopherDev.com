import React from 'react';
import useSkateboardStore from './../../stores/useSkateboardStore';
import { useMousePosition } from './../../hooks/useMousePosition';


const CursorHTML = () => {

    const { selectedPart } = useSkateboardStore()

    const { x, y } = useMousePosition()

    const Cursor_Styles = {
        width: "100%",
        height: "5rem",
        color: "white",
        position: "absolute",
        zIndex: 400,
        left: x + 15,
        top: y + 15,
        fontSize: 12,
        pointerEvents: "none",
    }




    return (
        <div style={Cursor_Styles}>
            <h1>{selectedPart}</h1>
        </div>
    )
}


export default CursorHTML;