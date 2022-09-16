import React from 'react';
import { extend } from '@react-three/fiber';
import { Plane } from '@react-three/drei';
import BwMaterial from '../../shaders/bw';
extend({ BwMaterial });

//todo: size of plane based on viewport dimensions
const Background = () => {
    return (
        <mesh position={ [0, 0, -.4] }>
            <Plane args={ [20, 10, 4] }>
                {/*@ts-expect-error instance of wasn't working will need to change*/ }
                <bwMaterial uGradientDirection={ true } />
            </Plane>
        </mesh>
    );
};

export default Background;