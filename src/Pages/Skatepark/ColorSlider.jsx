/* eslint-disable react/prop-types */
import React from 'react';
import { SwiperSlide, Swiper } from "swiper/react";
import { useState } from 'react';
import './styles/skateboard.css'
import { useRef } from 'react';
import useWindowSize from './../../hooks/useWindowSize';

const ColorSlider = ({ handleChange }) => {
    const [colorsArr] = useState(['#000000', '#ffffff', "#FF6900", "#55ffe1", "#0693E3", "#00D084", "#a6fd29", "#F78DA7", "#ff3b94", "#EB144C", "#9900EF", '#37013a'])

    const swiperRef = useRef();
    const { width } = useWindowSize();

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
            loop={width > 700 ? false : true}
            freeMode
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            spaceBetween={10}
            slidesPerView="auto"

        >


            {colorsArr.map((color, i) => {
                return (
                    <SwiperSlide
                        key={i}
                        // color={color}
                        className="color-slider"

                        style={{
                            width: "3rem",
                            height: "3rem",
                            // borderRadius: '50%',
                            background: colorsArr[i],
                            pointerEvents: 'auto',
                            cursor: 'pointer',
                            border: '1.9px solid white'
                        }}
                        onClick={() => handleChange(color)}

                    >

                    </SwiperSlide>
                );
            })}

        </Swiper>
    )
}


export default ColorSlider;