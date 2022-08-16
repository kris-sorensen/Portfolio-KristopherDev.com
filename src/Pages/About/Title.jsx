import React, { useRef, useState, useLayoutEffect } from 'react';
import { shaderMaterial, Text } from "@react-three/drei";
import { extend, useFrame } from '@react-three/fiber'
import * as THREE from "three";
import glsl from 'babel-plugin-glsl/macro.js'
import useWindowSize from '../../hooks/useWindowSize';

function Title() {

    const [titleFontSize, setTitleFontSize] = useState(1.8)

    const splitMaterial = useRef()
    const { width, height } = useWindowSize()

    useLayoutEffect(() => {
        if (width < 1147) setTitleFontSize(1.0)
        else setTitleFontSize(1.8)
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
                    <splitMaterial ref={splitMaterial} />hello!</Text>
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
                >click/tap Anywhere
                </Text>
            </mesh>
        </>
    );
}


const SplitMaterial = shaderMaterial(
    { uTime: 0 },// vertex shader
    glsl`
    varying vec2 vUv;

    void main(){
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        vUv = uv;
    }
  `,
    // fragment shader
    glsl`
    varying vec2 vUv;
    uniform float uTime;

    
    vec2 rotate(vec2 uv, float rotation, vec2 mid)
    {
        return vec2(
        cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
        cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
        );
    }
    void main() {
        vec2 rotateUv = rotate(vUv, 1.0, vec2(0.5));

        // Calculate Transition Line
        float sinTime = sin(uTime * .5);
        float fade = sinTime - .1;
        
        float strength = smoothstep( sinTime, fade, vUv.x);
        // float strength1 = 1.0 - step(.5,vUv.y);
        gl_FragColor = vec4(strength, strength, strength, strength);
    }
  `
)


extend({ SplitMaterial })



export default Title;