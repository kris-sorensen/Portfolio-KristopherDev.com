import React, { useEffect, useRef, useState } from 'react'
import useSkateboardStore from './../../stores/useSkateboardStore';
import { CirclePicker } from 'react-color';
import { useControls, folder } from 'leva';
import './styles/skateboard.css'
const ColorPicker = () => {
    const updateColor = useSkateboardStore((state) => state.updateColor);
    const updatePart = useSkateboardStore((state) => state.updatePart);
    const updateTexture = useSkateboardStore((state) => state.updateTexture);
    const { selectedPart } = useSkateboardStore()

    const [mistakeCount, setMistakeCount] = useState(0)

    useEffect(() => {
        if (selectedPart !== noPart && selectedPart !== warning1 && selectedPart !== defaultWarning && selectedPart !== finalWarning) {
            setMistakeCount(0)
        }
        updateColor(null)
    }, [selectedPart])

    const picker = useRef(null)

    const defaultWarning = 'Select Part'
    const warning1 = 'Select Part First'
    const noPart = 'No Part Selected'
    const finalWarning = 'Tap On Skateboard to Select Part'

    const handleChange = (color) => {

        if (selectedPart === noPart || selectedPart === warning1 || selectedPart === defaultWarning || selectedPart === finalWarning) {
            if (mistakeCount < 1) {
                setMistakeCount(mistakeCount + 1)
                updatePart(warning1)
            } else {
                setMistakeCount(mistakeCount + 1)
                updatePart(finalWarning)
            }
        } else {
            updateColor(color)
            // updateTexture('none')
        }

    }



    const { left, top } = useControls({
        ColorPicker: folder({
            left: { value: 50, min: 0, max: 100, step: .1 },
            top: { value: 90, min: 0, max: 100, step: .1 },
        })

    });

    const Texture_Style = {
        width: '30px',
        height: '30px',
        // background: 'none',
        borderRadius: '50%',
        border: '2px solid white',
        marginTop: '3.5rem',
        pointerEvents: "auto",
        cursor: 'pointer',
        marginLeft: '2rem'
    }

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
                    transition: "all .5s ease",
                    pointerEvents: "none",
                }}
            >Colors</div> : null
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
            {selectedPart === 'Deck' ? <div
                className="textureSelect"
                style={{
                    left: `${left + 30}%`,
                    top: `${top - 40}%`,
                    position: 'absolute',
                    transform: "translate(-50%, -50%)",
                    textAlign: 'center',
                    color: 'white',
                    fontSize: '2.2rem',
                    pointerEvents: "none",
                }}>Textures
                <div style={{
                    width: '100%',
                    display: 'flex',

                }}>
                    <div className="texture" onClick={() => updateTexture('none')} style={Texture_Style}></div>
                    <div onClick={() => updateTexture('checkered')} className="texture checkered" style={Texture_Style}></div>
                </div>
            </div> : null}
        </>
    )
}

export default ColorPicker