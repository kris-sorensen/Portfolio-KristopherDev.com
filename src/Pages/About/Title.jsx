import React, { useRef, useState, useLayoutEffect } from 'react';
import { Text } from "@react-three/drei";
import { extend, useFrame } from '@react-three/fiber'
import * as THREE from "three";
import useWindowSize from '../../hooks/useWindowSize';
import SlowRevealMaterial from '../../shaders/slowReveal'

extend({ SlowRevealMaterial })

function Title() {

    const [titleFontSize, setTitleFontSize] = useState(null)
    const [constructionFontSize, setConstructionFontSize] = useState(null)
    const [constructionY, setConstructionY] = useState(null)
    const [clickHereFontSize, setClickHereFontSize] = useState(null)
    const [clickHereY, setClickHereY] = useState(null)
    const [clickOrTap, setClickOrTap] = useState('')

    const splitMaterial = useRef()
    const { width, height } = useWindowSize()

    useLayoutEffect(() => {
        if (width < 1147) {
            setTitleFontSize(1.0)
            setConstructionFontSize(.2)
            setClickHereFontSize(.15)
            setClickOrTap('Tap')
        }
        else {
            setTitleFontSize(1.8)
            setConstructionFontSize(.3)
            setClickHereFontSize(.2)
            setClickOrTap('Click')
        }
        if (height < 400) {
            setConstructionY(-1)
            setClickHereY(-1.3)
        } else {
            setConstructionY(-2.2)
            setClickHereY(-2.5)
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
            <mesh position={[0, constructionY, 1]}>
                <Text
                    fontSize={constructionFontSize}
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
            <mesh position={[0, clickHereY, 1]}>
                <Text
                    color={'white'}
                    fontSize={clickHereFontSize}
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