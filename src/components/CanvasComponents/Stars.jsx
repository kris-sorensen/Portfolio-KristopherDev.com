import React, { useState } from 'react';
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Stars } from '@react-three/drei'
//imr, sfc

const StarsContainer = () => {
    return (
        <mesh>
            <Stars />
        </mesh>
    );
}

export default StarsContainer;
