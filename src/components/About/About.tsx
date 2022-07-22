import * as THREE from 'three';
import {Canvas, useThree} from "@react-three/fiber";
import {useControls, Leva} from 'leva';
import React, {Suspense} from 'react';
import {Html, useProgress} from '@react-three/drei';


interface AboutProps {
    hello: number;
    goodbye?: string;
}


const About=({hello, goodbye}: AboutProps) => {

    return (
        <div>{hello}</div>
    );
};


export default About;