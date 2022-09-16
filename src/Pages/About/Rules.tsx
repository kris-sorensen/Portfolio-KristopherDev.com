import React from 'react';
import * as THREE from "three";
import { Box, Circle, OrbitControls, Sphere, Text } from '@react-three/drei';
import BwMaterial from '../../shaders/bw';
import { extend } from '@react-three/fiber';

extend({ BwMaterial });

function Rules() {
    return (
        <>
            <mesh position={ [1.5, 0.15, 0] }>
                <Text
                    letterSpacing={ .8 }
                    fontSize={ .15 }
                    anchorX={ 'left' }
                    color={ '#ff0044' }
                >
                    PLAY
                </Text>
            </mesh>
            <mesh position={ [2.76, .85, 0] }>
                <Text
                    letterSpacing={ .8 }
                    fontSize={ .15 }
                    anchorX={ 'left' }
                    color={ '#00eeff' }
                >
                    SIMON
                </Text>
            </mesh>
        </>
    );
}

export default Rules;