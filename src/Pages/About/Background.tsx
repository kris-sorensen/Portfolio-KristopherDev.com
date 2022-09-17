import React from 'react';
import { extend, useThree } from '@react-three/fiber';
import { Plane } from '@react-three/drei';
import BwMaterial from '../../shaders/bw';
extend({ BwMaterial });

//todo: size of plane based on viewport dimensions
const Background = () => {
    const { viewport } = useThree();
    return (
        <mesh position={ [0, 0, -.4] }>
            <Plane args={ [viewport.width / .25, viewport.height / .25, 1] }>
                {/*@ts-expect-error instance of wasn't working will need to change*/ }
                <bwMaterial uGradientDirection={ true } />
            </Plane>
        </mesh>
    );
};

export default Background;