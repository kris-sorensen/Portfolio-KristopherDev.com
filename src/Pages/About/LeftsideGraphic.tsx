import * as THREE from 'three';
import { Plane } from '@react-three/drei';
import React, { useRef } from 'react';
import { extend, MeshProps, useFrame } from '@react-three/fiber';
import FlowerMaterial from '../../shaders/flower';

extend({ FlowerMaterial });

const LeftsideGraphic: React.FC<MeshProps> = () => {

    const material = useRef();
    useFrame(({ clock }) => {
        {/* @ts-expect-error instance of wasn't working will need to change */ }
        material.current.uniforms.uTime.value = clock.getElapsedTime();
    });

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