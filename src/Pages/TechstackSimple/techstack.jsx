import { Text } from '@react-three/drei';
import React, { useRef } from 'react';
import SlidingUVGradMaterial from '../../shaders/slidingUVGrad';
import { extend, useFrame } from '@react-three/fiber';

extend({ SlidingUVGradMaterial })

function Techstack() {
    const uvGrad = useRef();
    useFrame(({ clock }) => uvGrad.current.uniforms.uTime.value = clock.getElapsedTime())

    return (
        <mesh>
            <Text
                fontSize={1.2}
                maxWidth={400}
                lineHeight={1}
                letterSpacing={0.02}
                textAlign={'center'}
                font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
                anchorX="center"
                anchorY="middle"
                outlineOpacity={0}
            >Welcome!
                <slidingUVGradMaterial ref={uvGrad} uTime={0} />
            </Text>
        </mesh>
    );
}

export default Techstack;