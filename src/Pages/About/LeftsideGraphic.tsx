import React, { useRef } from 'react';
import * as THREE from 'three';
import { Plane } from '@react-three/drei';
import { extend, MeshProps, useFrame } from '@react-three/fiber';
// * shaders
import FlowerMaterial from '../../shaders/flower';
extend({ FlowerMaterial });

const LeftsideGraphic: React.FC<MeshProps> = () => {

    const material = useRef();
    useFrame(({ clock }) => {
        // todo: fix 
        {/* @ts-expect-error instance of wasn't working will need to change */ }
        material.current.uniforms.uTime.value = clock.getElapsedTime();
    });
    // todo: fix 
    return (
        <mesh position={ [-3, .2, 0] }>
            <Plane args={ [6, 6] }>
                {/* @ts-expect-error instance of wasn't working will need to change */ }
                <flowerMaterial ref={ material } transparent uTime={ 0 } />
            </Plane>
        </mesh>


    );
};

export default LeftsideGraphic;