import React, { useEffect, useRef } from 'react'
import useSkateboardStore from './../../stores/useSkateboardStore';
import { TwitterPicker, CirclePicker } from 'react-color';
import { useControls, folder } from 'leva';
import './styles/skateboard.css'
const ColorPicker = () => {
    const picker = useRef(null)


    const updateColor = useSkateboardStore((state) => state.updateColor)

    const handleChange = (color) => {
        updateColor(color)
        // console.log(picker)

    }

    const { left, top } = useControls({
        ColorPicker: folder({

            left: { value: 50, min: 0, max: 100, step: .1 },
            top: { value: 90, min: 0, max: 100, step: .1 },
        })

    });
    return (
        <div style={{ left: `${left}%`, top: `${top}%`, position: 'absolute', transform: "translate(-50%, -50%)", textAlign: 'center' }}>
            <CirclePicker

                colors={['#000000', '#ffffff', "#FF6900", "#55ffe1", "#0693E3", "#00D084", "#a6fd29", "#F78DA7", "#ff3b94", "#EB144C", "#9900EF", '#37013a']}
                width={window.innerWidth}
                // triangle={false}
                onChange={(e) => handleChange(e.hex)}
                ref={picker} />
        </div>
    )
}

export default ColorPicker