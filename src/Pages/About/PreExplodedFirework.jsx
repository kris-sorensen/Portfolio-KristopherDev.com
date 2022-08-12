import { Circle, Sparkles } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';

function PreExplodedFirework(props) {
    const meshRef = useRef()
    const explodeAtThisY = 3;
    // * x will be passed with props, so will what Y value it needs to go to
    // todo: dispose of object when it hits target
    // ? How to trigger the firework exploding? options: useState change, time, pass the explode function down
    // ? keep in seperate component or add to AboutCanvas


    useFrame(() => {
        if (meshRef.current.position.y >= explodeAtThisY) {
            console.log('we have arrived')
        } else meshRef.current.position.y += .03
    })

    return (
        <mesh ref={meshRef} position={[-4, -6, 0]}>
            <Sparkles color="#9EC8FF" count={1} scale={1} size={4} speed={.1} />
        </mesh>
    );
}

export default PreExplodedFirework;