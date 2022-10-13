import React from 'react'
import { HexColorPicker } from 'react-colorful'

const ColorPicker = () => {

    return (
        <div >
            <HexColorPicker style={{ position: 'absolute', zIndex: 20, left: '6rem', top: '6rem' }} />
        </div>
    )
}

export default ColorPicker