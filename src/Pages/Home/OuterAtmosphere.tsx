import React from 'react';
import * as THREE from "three";
import {extend, MeshProps} from '@react-three/fiber';
import {Sphere} from "@react-three/drei";
import OuterAtmosphereMaterial from '../../shaders/outerAtmosphere';
import useWindowResize from '../../hooks/useWindowResize';


extend({OuterAtmosphereMaterial});

const Atmosphere: React.FC<MeshProps>=() => {
    const elementSize=useWindowResize();
    return (
        <mesh position={[0, 0, 0]}>
            <Sphere args={[elementSize.earthSize, 30, 30]} scale={elementSize.scale}>
                <outerAtmosphereMaterial />
            </Sphere>
        </mesh>
    );
};

export default Atmosphere;