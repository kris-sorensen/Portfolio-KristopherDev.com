import React, { useEffect, useRef, useState } from 'react'
import useSkateboardStore from './../../stores/useSkateboardStore';
import { CirclePicker } from 'react-color';
import { useControls, folder } from 'leva';
import './styles/skateboard.css'
const ColorPicker = () => {
    const updateColor = useSkateboardStore((state) => state.updateColor);
    const updatePart = useSkateboardStore((state) => state.updatePart);
    const { selectedPart } = useSkateboardStore()

    const [mistakeCount, setMistakeCount] = useState(0)

    useEffect(() => {
        if (selectedPart !== noPart && selectedPart !== warning1 && selectedPart !== defaultWarning && selectedPart !== finalWarning) {
            setMistakeCount(0)
        }
    }, [selectedPart])

    const picker = useRef(null)

    const defaultWarning = 'Select Part'
    const warning1 = 'Select Part First'
    const noPart = 'No Part Selected'
    const finalWarning = 'Tap On Skateboard Wheels or Deck to Modify'

    const handleChange = (color) => {

        if (selectedPart === noPart || selectedPart === warning1 || selectedPart === defaultWarning || selectedPart === finalWarning) {
            if (mistakeCount < 1) {
                setMistakeCount(mistakeCount + 1)
                updatePart('Select Part First')
            } else {
                setMistakeCount(mistakeCount + 1)
                updatePart('Tap On Skateboard Wheels or Deck to Modify')
            }
        } else updateColor(color)

    }



    const { left, top } = useControls({
        ColorPicker: folder({
            left: { value: 50, min: 0, max: 100, step: .1 },
            top: { value: 90, min: 0, max: 100, step: .1 },
        })

    });

    return (
        <>
            {selectedPart !== noPart && selectedPart !== warning1 && selectedPart !== defaultWarning && selectedPart !== finalWarning ? <div
                className="ColorSelect"
                style={{
                    color: 'white',
                    fontSize: '2.2rem',
                    left: `${left}%`,
                    top: `${top - 8.5}%`,
                    position: 'absolute',
                    transform: "translate(-50%, -50%)",
                    textAlign: 'center',
                    transition: "all 2s",
                    pointerEvents: "none",
                }}
            >Select Color</div> : null
            }

            <div
                style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    position: 'absolute',
                    transform: "translate(-50%, -50%)",
                    textAlign: 'center',
                }}>

                <CirclePicker
                    colors={['#000000', '#ffffff', "#FF6900", "#55ffe1", "#0693E3", "#00D084", "#a6fd29", "#F78DA7", "#ff3b94", "#EB144C", "#9900EF", '#37013a']}
                    width={window.innerWidth}
                    onChange={(e) => handleChange(e.hex)}
                    ref={picker} />
            </div>
        </>
    )
}

export default ColorPicker