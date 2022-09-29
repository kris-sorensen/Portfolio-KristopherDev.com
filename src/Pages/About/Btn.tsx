import React, { useRef, useState } from 'react';
import * as THREE from "three";
import { Plane, Text } from '@react-three/drei';
import { extend, useFrame, useThree } from '@react-three/fiber';
// * hooks
import useWindowSize from '../../hooks/useWindowSize';
// * shaders
import HaloMaterial from '../../shaders/halo';
extend({ HaloMaterial });

const Btn = () => {
    const { width, height } = useWindowSize();
    const [hovered, setHovered] = useState(false);
    const { viewport } = useThree();
    const text = useRef(null);
    const halo = useRef(null);


    const handleHover = () => {
        setHovered(!hovered);
    };

    // BTN Animation on Hover
    useFrame(() => {
        if(halo.current != null) {
            if(!hovered) {
                // todo: fix
                {/*@ts-expect-error instance of wasn't working will need to change*/ }
                if(halo.current.uniforms.uSpread.value > 0) {
                    {/*@ts-expect-error instance of wasn't working will need to change*/ }
                    halo.current.uniforms.uSpread.value -= .013;
                }
            } else {
                {/*@ts-expect-error instance of wasn't working will need to change*/ }
                if(halo.current.uniforms.uSpread.value <= .24) {
                    {/*@ts-expect-error instance of wasn't working will need to change*/ }
                    halo.current.uniforms.uSpread.value += .009;

                }
            }
        }
    });
    // todo: fix non null assertion and other
    return (
        <group
            scale={ width! > 900 ? .9 : .7 }
            onClick={ () => document.location = '/connect' }
            onPointerOver={ handleHover }
            onPointerOut={ handleHover }
            position={ [width! > 900 ? viewport.width * .5 - 1 : -1.55, width! > 900 ? viewport.height * -.5 + 1 : -.65, .001] }
        >
            {/* halo */ }
            <mesh>
                <Plane >
                    {/*@ts-expect-error instance of wasn't working will need to change*/ }
                    <haloMaterial ref={ halo } transparent />
                </Plane>
            </mesh>
            <mesh>
                <Text
                    ref={ text }
                    letterSpacing={ .2 }
                    fontSize={ .115 }
                    anchorX={ 'center' }
                    color={ !hovered ? '#ff0044' : "#ff0044" }
                    // font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
                    font="./DINAlternate-Bold.woff"
                >
                    CONNECT
                </Text>
            </mesh>
        </group >
    );
};

export default Btn;