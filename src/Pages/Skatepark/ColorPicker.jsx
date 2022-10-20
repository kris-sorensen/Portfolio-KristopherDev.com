import React, { useEffect, useRef, useState } from 'react'
import { useControls, folder } from 'leva';
import { CirclePicker } from 'react-color';
import './styles/skateboard.css'
// * Stores
import useSkateboardStore from './../../stores/useSkateboardStore';
// * Hooks
import useWindowSize from './../../hooks/useWindowSize';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
    Navigation,
    Pagination,
    Autoplay,
    Virtual,
} from "swiper/core";
import "swiper/swiper-bundle.css";
import ColorSlider from './ColorSlider';
import TextureSlider from './TextureSlider';

console.log('swiper', SwiperSlide)
//todo: need to make the whole experience
// [ ] double flash when you select the part.
// [ ] bottom of screen will have 2 selection above the colors. one for textures and one for colors. darker grey coloring.
// maybe squares on mobile
// create a portal that launches first.
// says something like "Customize and create the perfect skateboard. " w/ a btn saying [ Create ] or customize taht will release the portal and open the page. 

// make rotate and have a portal that pops up to turn it 360 degrees

// endless scroll for colors right and left. Have it loop?

// parts listed across the top in endless scroll  and icon next to word. maybe no words but a big enough gap so it is easy to select

// have a btn [see board in action up side] like skateboard alphabet. it would take you to a page where you could see the skateboard do a trick and show the back side

// could you add the ability to add your own texture? 


const ColorPicker = () => {
    const updateColor = useSkateboardStore((state) => state.updateColor);
    const updatePart = useSkateboardStore((state) => state.updatePart);
    // const updateTexture = useSkateboardStore((state) => state.updateTexture);
    const { selectedPart } = useSkateboardStore()
    const { width } = useWindowSize();

    const [mistakeCount, setMistakeCount] = useState(0)
    const [colorTextureToggle, setColorTextureToggle] = useState('colors')

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
        // console.log(`color`, color)
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



    return (
        <>
            <div
                className="ColorSelect"
                onClick={() => setColorTextureToggle('colors')}
                style={{
                    left: width > 960 ? '42%' : "30%",
                    top: width > 960 ? `${top - 3}%` : `${top - 3}%`,
                    padding: '7px',
                    background: colorTextureToggle === 'colors' ? '#F78DA7' : 'none',
                    paddingRight: '.8px',

                    maxWidth: '300px'
                }}
            >Colors</div>
            <div
                onClick={() => setColorTextureToggle('textures')}
                className="ColorSelect"
                style={{
                    left: width > 960 ? '58%' : "70%",
                    top: width > 960 ? `${top - 3}%` : `${top - 3}%`,
                    padding: '7px',
                    background: colorTextureToggle === 'textures' ? '#0693E3' : 'none',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    paddingRight: '.8px'
                }}
            >Textures</div>


            <div
            // style={{
            //     left: `${left}%`,
            //     top: `${top}%`,
            //     position: 'absolute',
            //     transform: "translate(-50%, -50%)",
            //     textAlign: 'center',
            //     zIndex: '400'
            // }},
            >
                {colorTextureToggle === 'colors' && <ColorSlider handleChange={handleChange} />}

                {colorTextureToggle === 'textures' && <TextureSlider />}



            </div>



            {/* {
                selectedPart === 'f' ? <div
                    className="textureSelect"
                    style={{
                        left: width > 600 ? `${left + 30}%` : `${left}%`,
                        // left: `${left}%`,
                        top: width > 600 ? `${top - 40}%` : `${top - 55}%`,
                        // top: `${top - 55}%`,
                        position: 'absolute',
                        transform: "translate(-50%, -50%)",
                        textAlign: 'center',
                        color: 'white',
                        fontSize: '2.2rem',
                        pointerEvents: "none",
                    }}>Textures */}
            {/* <div style={{
                        width: '100%',
                        display: 'flex',

                    }}> */}
            {/* <div className="texture" onClick={() => updateTexture('none')} style={Texture_Style}></div>
                        <div onClick={() => updateTexture('checkered')} className="texture checkered" style={Texture_Style}></div>
                        <div onClick={() => updateTexture('pokadot')} className="texture pokadot" style={Texture_Style}></div> */}
            {/* <div onClick={() => updateTexture('ghost')} className="texture ghost" style={Texture_Style}>
                        <img className="" src={'/skatepark/skateboard/textures/ghostIcon.jpg'} alt="Ghost Texture" />
                    </div> */}
            {/* </div> */}
            {/* </div> : null */}
            {/* } */}
        </>
    )
}

export default ColorPicker