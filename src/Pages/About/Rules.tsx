import React, { useRef, useState } from 'react';
import * as THREE from "three";
import { Box, Circle, OrbitControls, Sphere, Text } from '@react-three/drei';
import BwMaterial from '../../shaders/bw';
import { extend } from '@react-three/fiber';

extend({ BwMaterial });


// todo: fix any type
function Rules({ restart }: any) {
    const [playHovered, setPlayHovered] = useState(false);
    const [simonHovered, setSimonHovered] = useState(false);
    // todo: fix null type
    const play = useRef(!null);
    const simon = useRef(!null);
    const handlePlayHover = () => {
        if(playHovered) {
            setPlayHovered(false);
            // @ts-expect-error instance of wasn't working will need to change
            play.current.material.color.set('#ff0044');
        } else {
            setPlayHovered(true);
            // @ts-expect-error instance of wasn't working will need to change
            play.current.material.color.set('#00eeff');
        }
    };
    const handleSimonHover = () => {
        if(simonHovered) {
            setSimonHovered(false);
            // @ts-expect-error instance of wasn't working will need to change
            simon.current.material.color.set('#00eeff');
        } else {
            setSimonHovered(true);
            // @ts-expect-error instance of wasn't working will need to change
            simon.current.material.color.set('#ff0044');
        }
    };
    //onClick={ restart }
    return (
        <>
            <mesh onClick={ restart } onPointerOver={ handlePlayHover } onPointerOut={ handlePlayHover } position={ [.7, .6, 0] }>
                <Text ref={ play }
                    letterSpacing={ !playHovered ? .8 : .2 }
                    fontSize={ .15 }
                    anchorX={ 'right' }
                    color={ '#ff0044' }
                >

                    { !playHovered ? "PLAY" : 'RESTART' }
                </Text>
            </mesh>
            <mesh onPointerOver={ handleSimonHover } onPointerOut={ handleSimonHover } position={ [2.25, 1.3, 0] }>
                <Text ref={ simon }
                    letterSpacing={ !simonHovered ? .8 : 0.2 }
                    fontSize={ .15 }
                    anchorX={ 'right' }
                    color={ '#00eeff' }
                >
                    { !simonHovered ? "SIMON" : 'click on blocks in the order they appear in' }
                </Text>
            </mesh>
        </>
    );
}

export default Rules;