import * as THREE from 'three';
import { Plane } from '@react-three/drei';
import React from 'react';
import { extend, MeshProps } from '@react-three/fiber';
import FlowerMaterial from '../../shaders/flower';

extend({ FlowerMaterial });

const LeftsideGraphic: React.FC<MeshProps> = () => {
    return (
        // <mesh position={ [0, 0, 0] }>
        //     <Plane args={ [1.5, 1.5] }>
        //         {/* <flowerMaterial transparent /> */ }
        //     </Plane>
        // </mesh>

        <mesh>

        </mesh>
    );
};

export default LeftsideGraphic;