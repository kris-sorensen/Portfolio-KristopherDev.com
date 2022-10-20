/* eslint-disable react/prop-types */
import React from 'react';
import { SwiperSlide, Swiper } from "swiper/react";
import { useState } from 'react';
import './styles/skateboard.css'
import { useRef } from 'react';
import useWindowSize from '../../hooks/useWindowSize';
import useSkateboardStore from '../../stores/useSkateboardStore';

const TextureSlider = ({ handleChange }) => {
    const updateTexture = useSkateboardStore((state) => state.updateTexture);
    const swiperRef = useRef();
    const { width } = useWindowSize();
    // const Texture_Style = {
    //     width: '30px',
    //     height: '30px',
    //     // background: 'none',
    //     borderRadius: '50%',
    //     border: '2px solid white',
    //     marginTop: '3.5rem',
    //     pointerEvents: "auto",
    //     cursor: 'pointer',
    //     marginLeft: '2rem'
    // }
    return (

        <Swiper
            style={{
                bottom: 0,
                position: 'fixed',
                paddingBottom: '20px',
                paddingTop: '20px',
                overflow: "visible",
                pointerEvents: 'auto',
                width: '100%',
                // transform: "translate(-50%, -50%)",
                // textAlign: 'center',
            }}
            loop={width > 600 ? false : true}
            freeMode
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            spaceBetween={20}
            slidesPerView="auto"

        >



            <SwiperSlide
                className="color-slider"
                style={{
                    width: "35px",
                    height: "35px",
                    // borderRadius: '50%',
                    // background: colorsArr[i],
                    pointerEvents: 'auto',
                    cursor: 'pointer',
                    border: '2px solid white'
                }}
            // onClick={() => handleChange(color)}

            >
                <div className="texture" onClick={() => updateTexture('none')} ></div>
                <div onClick={() => updateTexture('checkered')} className="texture checkered" ></div>
                <div onClick={() => updateTexture('pokadot')} className="texture pokadot" ></div>
            </SwiperSlide>


        </Swiper>
    )
}


export default TextureSlider;