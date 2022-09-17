import React, { useRef, useState, useLayoutEffect } from 'react';
import { Plane, Text } from "@react-three/drei";
import { extend, useFrame } from '@react-three/fiber'
import * as THREE from "three";
import useWindowSize from '../../hooks/useWindowSize';
import SlowRevealMaterial from '../../shaders/slowReveal'
import gsap from 'gsap';
import useTimeout from '../../hooks/useTimeout'
// import { useNavigate } from "react-router-dom";

extend({ SlowRevealMaterial })

function HomeContent() {

    const [titleFontSize, setTitleFontSize] = useState(null)
    const [btnFontSize, setBtnFontSize] = useState(null)
    const [btnY, setBtnY] = useState(null)
    const [clickHereFontSize, setClickHereFontSize] = useState(null)
    const [clickHereY, setClickHereY] = useState(null)
    const [clickOrTap, setClickOrTap] = useState('')
    const [isHovered, setIsHovered] = useState(false)
    const { width, height } = useWindowSize()


    const splitMaterial = useRef()
    const btn = useRef()
    const plane = useRef()

    useLayoutEffect(() => {
        if (width < 1147) {
            setTitleFontSize(1.0)
            setBtnFontSize(.4)
            setClickHereFontSize(.15)
            setClickOrTap('Tap')
        }
        else {
            setTitleFontSize(1.8)
            setBtnFontSize(.4)
            setClickHereFontSize(.18)
            setClickOrTap('Click')
        }
        if (height < 400) {
            setBtnY(-.9)
            setClickHereY(-1.2)
        } else {
            setBtnY(-2)
            setClickHereY(-3.8)
        }
    }, [width])

    useFrame(({ clock }) => {
        splitMaterial.current.uniforms.uTime.value = clock.getElapsedTime()
    })

    // const handleTransition = () => {
    //     // document.location = '/main'
    // }


    const [delay, setDelay] = useState(2400)
    // ON/OFF
    const [isTransitioning, setIsTransitioning] = useState(false)

    useTimeout(
        () => {
            // Your custom logic here
            document.location = '/#about'
        },
        // Delay in milliseconds or null to stop it
        isTransitioning ? delay : null,
    )

    //* Enter Btn

    const handleHover = () => {

        if (!isHovered) {
            setIsHovered(true)
            gsap.to(btn.current, {
                color: '#724BCC',
                duration: .5,
            });
            plane.current.color.set('#F3246C')

        } else {
            setIsHovered(false)
            gsap.to(btn.current, {
                color: '#F3246C',
                duration: .5,
            });
            plane.current.color.set('#724BCC')
        }
    }

    const handleClick = () => {
        document.location = '/about'
        // setIsTransitioning(true)
    }

    return (
        <>
            <mesh position={[0, 1, 1]}>
                <Text
                    fontSize={titleFontSize}
                    maxWidth={400}
                    lineHeight={1}
                    letterSpacing={0.02}
                    textAlign={'center'}
                    font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
                    anchorX="center"
                    anchorY="middle"
                    outlineOpacity={0}
                >
                    <slowRevealMaterial ref={splitMaterial} />hello!</Text>
            </mesh>
            <mesh position={[0, btnY + .6, 1]} >
                <Plane position={[0, .15, 0]} args={[1.6, .8]}>
                    <meshBasicMaterial ref={plane} color={'#724BCC'} />
                </Plane>
                <Text ref={btn} onPointerOver={handleHover} onPointerOut={handleHover} onClick={handleClick}
                    fontSize={btnFontSize}
                    maxWidth={200}
                    lineHeight={1}
                    lineWidth={2}
                    letterSpacing={0.02}
                    textAlign={'center'}
                    color={'#F3246C'}
                    anchorX="center"
                    anchorY="bottom-baseline"
                    outlineOpacity={.3}
                    outlineWidth={.01}
                >ENTER</Text>
            </mesh>
            <mesh position={[0, clickHereY, 1]}>
                <Text
                    color={'#F3246C'}
                    strokeWidth={100}
                    fontSize={clickHereFontSize}
                    maxWidth={200}
                    lineHeight={1}
                    letterSpacing={0.5}
                    textAlign={'center'}
                    anchorX="center"
                    anchorY="bottom-baseline"
                    outlineOpacity={0}
                >{clickOrTap} Everywhere</Text>
            </mesh>
        </>
    );
}








export default HomeContent;