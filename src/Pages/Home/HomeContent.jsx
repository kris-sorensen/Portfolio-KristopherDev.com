import React, { useRef, useState, useLayoutEffect } from 'react';
import { Plane, Text } from "@react-three/drei";
import { extend, useFrame } from '@react-three/fiber'
import * as THREE from "three";
import useWindowSize from '../../hooks/useWindowSize';
import SlowRevealMaterial from '../../shaders/slowReveal'
import MovingBlocksMaterial from '../../shaders/movingBlocks'
import useTimeout from '../../hooks/useTimeout'
import PropTypes from 'prop-types';


extend({ SlowRevealMaterial })
extend({ MovingBlocksMaterial })

function HomeContent() {

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
    const plane1 = useRef()
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

        if (isHovered && plane2.current.uniforms.uTime.value < .75) {
            plane1.current.uniforms.uTime.value -= .015
            plane2.current.uniforms.uTime.value += .015
        }

        else if (!isHovered && plane2.current.uniforms.uTime.value > 0) {
            plane1.current.uniforms.uTime.value += .045
            plane2.current.uniforms.uTime.value -= .045
        }
    })



    //* Enter Btn

    const handleHover = () => {

        if (!isHovered) {
            setIsHovered(true)

        } else {
            setIsHovered(false)
        }
    }

    const handleClick = async () => {
        document.location = '/about'
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
                    <Plane
                        position={[-.6, .15, 0]}
                        args={[1.2, .8]}
                    >
                        <movingBlocksMaterial
                            ref={plane1}
                            uColor={new THREE.Vector3(0.247, 0.318, 0.71)}
                        />
                    </Plane>
                    <Plane
                        position={[.6, .15, 0]}
                        args={[1.2, .8]}
                    >
                        <movingBlocksMaterial
                            ref={plane2}
                            uColor={new THREE.Vector3(0.247, 0.318, 0.71)}
                        />
                    </Plane>
                    <Text
                        ref={btn}
                        onPointerOver={handleHover}
                        onPointerOut={handleHover}
                        onClick={handleClick}
                        fontSize={btnFontSize}
                        maxWidth={200}
                        lineHeight={1}
                        lineWidth={2}
                        letterSpacing={0.18}
                        textAlign={'center'}
                        color={'#ffffff'}
                        anchorX="center"
                        font="./DINAlternate-Bold.woff"
                        anchorY="bottom-baseline"
                    >ENTER</Text>
                </mesh>

            </group>
            <mesh
                ref={click}
                scale={!clickHovered ? 1 : 1.05}
                onPointerOver={() => setClickHovered(true)}
                onPointerOut={() => setClickHovered(false)}
                position={[0, width > 900 ? clickHereY : clickHereY + 1.5, 1]}
            >
                <Text
                    color={'#F3246C'}
                    strokeWidth={100}
                    fontSize={clickHereFontSize}
                    maxWidth={200}
                    lineHeight={1}
                    letterSpacing={width > 900 ? 0.7 : .3}
                    textAlign={'center'}
                    anchorX="center"
                    anchorY="bottom-baseline"
                    outlineOpacity={0}
                    font="./DINAlternate-Bold.woff"
                >{clickOrTap} Everywhere</Text>
            </mesh>
        </>
    );
}

//todo:
// send color uniform in,
// create + or - uAdd x




// * Types
HomeContent.propTypes = {
    launchFirework: PropTypes.func,
};




export default React.memo(HomeContent);