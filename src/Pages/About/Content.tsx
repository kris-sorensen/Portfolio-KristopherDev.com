import { Plane, Text } from '@react-three/drei';
import { extend, useThree } from '@react-three/fiber';
import React from 'react';
import OutlineMaterial from '../../shaders/outline';

extend({ OutlineMaterial });

function Content() {
    const { viewport } = useThree();

    return (
        <group>
            <mesh position={ [-4.5, viewport.height / 18, 0.001] }>
                <Text
                    anchorX={ 'left' }
                    color='black'
                    fontSize={ .1 }
                    font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff">
                    Hello and welcome to my site!
                </Text>
            </mesh>
            <mesh position={ [-4.5, viewport.height / 30, 0.001] }>
                <Text
                    anchorX={ 'left' }
                    anchorY={ 'top' }
                    color='black'
                    fontSize={ .1 }
                    maxWidth={ 3 }
                    lineHeight={ 1.8 }
                    font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff">
                    I am a Software Engineer with 7+ years of experience creating memorable, and beautiful web experiences that captivate and engage guests.
                </Text>
            </mesh>

            <mesh position={ [-3, .1, 0] }>
                <Plane args={ [3.8, 1.5] }>
                    {/* @ts-expect-error instance of wasn't working will need to change */ }
                    <outlineMaterial />
                </Plane>
            </mesh>
        </group >
    );
}

export default Content;