import React, { useRef, useState, useLayoutEffect } from 'react';
import { Plane, Text } from "@react-three/drei";
import { extend, useFrame } from '@react-three/fiber'
import * as THREE from "three";
import useWindowSize from '../../hooks/useWindowSize';
import SlowRevealMaterial from '../../shaders/slowReveal'
import gsap from 'gsap';
import useTimeout from '../../hooks/useTimeout'
// import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { sleep } from '../../utils/sleep'
import { click } from '@testing-library/user-event/dist/click';

extend({ SlowRevealMaterial })

function HomeContent({ launchFirework }) {

    const [titleFontSize, setTitleFontSize] = useState(null)
    const [btnFontSize, setBtnFontSize] = useState(null)
    const [btnY, setBtnY] = useState(null)
    const [clickHereFontSize, setClickHereFontSize] = useState(null)
    const [clickHereY, setClickHereY] = useState(null)
    const [clickOrTap, setClickOrTap] = useState('')
    const [isHovered, setIsHovered] = useState(false)
    const [clickHovered, setClickHovered] = useState(false)
    const { width, height } = useWindowSize()


    const slowRevealMaterial = useRef()
    const btn = useRef()
    const plane = useRef()
    const plane2 = useRef()
    const click = useRef()

    useLayoutEffect(() => {
        if (width < 1147) {
            setTitleFontSize(1.0)
            setBtnFontSize(.4)
            setClickHereFontSize(.2)
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
        slowRevealMaterial.current.uniforms.uTime.value = clock.getElapsedTime()
        if (!isHovered) {
            if (plane.current.position.x > .6) {

                plane.current.position.x -= .075
                plane2.current.position.x += .075
            }
        } else if (isHovered && plane.current.position.x < 1.7) {
            plane.current.position.x += .03
            plane2.current.position.x -= .03
        }

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
            document.location = '/about'
        },
        // Delay in milliseconds or null to stop it
        isTransitioning ? delay : null,
    )

    //* Enter Btn

    const handleHover = () => {

        if (!isHovered) {
            setIsHovered(true)
            // gsap.to(btn.current, {
            //     color: '#724BCC',
            //     duration: .5,
            // });
            // plane.current.color.set('#F3246C')


        } else {
            setIsHovered(false)
            // gsap.to(btn.current, {
            //     color: '#F3246C',
            //     duration: .5,
            // });
            // plane.current.color.set('#724BCC')
        }
    }

    const handleClick = async () => {
        document.location = '/about'

        // for (let i = 0; i < 20; i++) {
        //     // await sleep(50)
        //     // const launchHere = [Math.random() * (2 - -2) + -2, Math.random() * (1 - -1) + -3]
        //     const launchHere = [-4 + (i / 2), 0]
        //     launchFirework(launchHere)
        //     console.log('launch')
        // }
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
                    <slowRevealMaterial ref={slowRevealMaterial} />hello!</Text>
            </mesh>
            <group scale={width > 900 ? .8 : .5}>
                <mesh position={[0, width > 900 ? btnY : btnY + .9, 1]} >
                    <Plane ref={plane} position={[.6, .15, 0]} args={[1.2, .8]}>
                        <meshBasicMaterial color={'#3f51b5'} />
                    </Plane>
                    <Plane ref={plane2} position={[-.6, .15, 0]} args={[1.2, .8]}>
                        <meshBasicMaterial color={'#3f51b5'} />
                    </Plane>
                    <Text ref={btn} onPointerOver={handleHover} onPointerOut={handleHover} onClick={handleClick}
                        fontSize={btnFontSize}
                        maxWidth={200}
                        lineHeight={1}
                        lineWidth={2}
                        letterSpacing={0.15}
                        textAlign={'center'}
                        color={'#ffffff'}
                        anchorX="center"
                        anchorY="bottom-baseline"

                    // outlineOpacity={.6}
                    // outlineWidth={.008}
                    >ENTER</Text>
                </mesh>

            </group>
            <mesh ref={click} scale={!clickHovered ? 1 : 1.05} onPointerOver={() => setClickHovered(true)}
                onPointerOut={() => setClickHovered(false)}
                position={[0, width > 900 ? clickHereY : clickHereY + 1.5, 1]}>
                <Text
                    color={'#F3246C'}
                    strokeWidth={100}
                    fontSize={clickHereFontSize}
                    maxWidth={200}
                    lineHeight={1}
                    letterSpacing={width > 900 ? 0.5 : .3}
                    textAlign={'center'}
                    anchorX="center"
                    anchorY="bottom-baseline"
                    outlineOpacity={0}
                >{clickOrTap} Everywhere</Text>
            </mesh>
        </>
    );
}




// * Types
HomeContent.propTypes = {
    launchFirework: PropTypes.func,
};




export default HomeContent;