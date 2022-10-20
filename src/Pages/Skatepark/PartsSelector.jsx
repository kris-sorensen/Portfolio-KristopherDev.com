import React from 'react';
import { SwiperSlide, Swiper } from "swiper/react";
import { useState } from 'react';
import './styles/skateboard.css'
import { useRef } from 'react';
import useWindowSize from '../../hooks/useWindowSize';


const PartsSelector = () => {
    const [colorsArr] = useState(['#333', '#333', "#333",])
    const [partsArr] = useState(['Deck', 'Front Wheels', "Rear Wheels"])
    const { width } = useWindowSize();

    const swiperRef = useRef();

    return (
        <Swiper
            style={{
                top: "10%",
                position: 'fixed',
                // paddingBottom: '2rem',
                // paddingTop: '2rem',
                overflow: "visible",
                pointerEvents: 'auto',
                width: '100%',
                background: '#fff',
                opacity: .1

                // transform: "translate(-50%, -50%)",
                // textAlign: 'center',
            }}
            loop={width > 600 ? false : true}
            freeMode
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            spaceBetween={80}
            slidesPerView="auto"

        >


            {colorsArr.map((color, i) => {
                return (
                    <>
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
                                // border: '1.9px solid white'
                            }}
                        // onClick={() => handleChange(color)}

                        >
                            <div style={{ position: "relative", left: '60px', top: '50%', transform: "translate(-50%, -50%)", }}>
                                <span style={{ color: '#eee', }}>{partsArr[i]}</span>
                            </div>
                        </SwiperSlide>

                    </>
                );
            })}
        </Swiper>
    )
}


export default PartsSelector;