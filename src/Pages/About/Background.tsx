import React, { useEffect, useRef } from 'react';
import { extend, useThree } from '@react-three/fiber';
import { Plane } from '@react-three/drei';
// * hooks
import useWindowSize from '../../hooks/useWindowSize';
// * shaders
import BwMaterial from '../../shaders/bw';
extend({ BwMaterial });

const Background = () => {
    const { viewport } = useThree();
    const { width, height } = useWindowSize();
    const material = useRef();

    useEffect(() => {
        if(typeof width !== 'undefined') {
            if(width < 900) {
                //todo: fix 
                // @ts-expect-error instance of wasn't working will need to change
                material.current.uniforms.uMobile.value = true;
                // @ts-expect-error instance of wasn't working will need to change
                material.current.uniforms.uGradientDirection.value = false;
            } else {
                // @ts-expect-error instance of wasn't working will need to change
                material.current.uniforms.uMobile.value = false;
                // @ts-expect-error instance of wasn't working will need to change
                material.current.uniforms.uGradientDirection.value = true;
            }
        }
    }, [width, height]);


    //todo: fix 
    return (
        <mesh position={ [0, 0, -.4] }>
            <Plane args={ [viewport.width / .25, viewport.height / .25, 1] }>
                {/*@ts-expect-error instance of wasn't working will need to change*/ }
                <bwMaterial
                    ref={ material }
                    uGradientDirection={ true }
                    uMobile={ true } />
            </Plane>
        </mesh>
    );
};



export default Background;