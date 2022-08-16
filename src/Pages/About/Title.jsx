import React, { useRef, useState, useLayoutEffect } from 'react';
import { shaderMaterial, Text } from "@react-three/drei";
import { extend, useFrame } from '@react-three/fiber'
import * as THREE from "three";
import glsl from 'babel-plugin-glsl/macro.js'
import useWindowSize from '../../hooks/useWindowSize';
import SlowRevealMaterial from '../../shaders/slowReveal'

extend({ SlowRevealMaterial })



function Title() {

    const [titleFontSize, setTitleFontSize] = useState(1.8)
    const [clickOrTap, setClickOrTap] = useState('')

    const splitMaterial = useRef()
    const { width } = useWindowSize()

    useLayoutEffect(() => {
        if (width < 1147) {
            setTitleFontSize(1.0)
            setClickOrTap('Tap')
        }
        else {
            setTitleFontSize(1.8)
            setClickOrTap('Click')
        }
    }, [width])

    useFrame(({ clock }) => {
        splitMaterial.current.uniforms.uTime.value = clock.getElapsedTime()
    })

    return (
        <>
            <mesh position={[0, 0, 1]}>
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
            <mesh position={[0, -2, 1]}>
                <Text
                    fontSize={.3}
                    maxWidth={200}
                    lineHeight={1}
                    letterSpacing={0.02}
                    textAlign={'center'}
                    color={'yellow'}
                    anchorX="center"
                    anchorY="bottom-baseline"
                    outlineOpacity={0}
                >Under Construction
                </Text>
            </mesh>
            <mesh position={[0, -2.5, 1]}>
                <Text
                    color={'white'}
                    fontSize={.2}
                    maxWidth={200}
                    lineHeight={1}
                    letterSpacing={0.02}
                    textAlign={'center'}
                    anchorX="center"
                    anchorY="bottom-baseline"
                    outlineOpacity={0}
                >{clickOrTap} Anywhere
                </Text>
            </mesh>
        </>
    );
}








export default Title;