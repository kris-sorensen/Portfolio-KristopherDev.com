import React, { useRef } from 'react';
import * as THREE from 'three';
import { Points, Point, PointMaterial } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import PropTypes from 'prop-types';

const Fireworks = (props) => {
    console.log(props.position)
    const count = 100;
    const positions = Array.from({ length: count }, (i) => [
        THREE.MathUtils.randFloatSpread(.1),
        THREE.MathUtils.randFloatSpread(.1),
        THREE.MathUtils.randFloatSpread(0),
    ])

    const meshRef = useRef()
    const matRef = useRef()

    const angleIncrement = (Math.PI * 2) / count
    useFrame(() => {

        if (meshRef.current.children[0].children[0].material.opacity < 0) {
            // console.log(meshRef.current)
        }

        for (let i = 0; i < count; i++) {

            meshRef.current.children[0].children[i].position.x += (Math.cos(angleIncrement * i)) * .01
            meshRef.current.children[0].children[i].position.y += (Math.sin(angleIncrement * i)) * .01

            meshRef.current.children[0].children[i].material.opacity -= .01
        }
    })


    return (
        <>
            <mesh ref={meshRef}>
                <Points limit={positions.length} range={count}>
                    <PointMaterial ref={matRef} transparent size={3} />
                    {positions.map((position, i) => (
                        <PointEvent key={i} position={position} />
                    ))}
                </Points>
            </mesh>
        </>
    );
};

function PointEvent(props) {

    return (
        <>
            <mesh>
                <Point
                    {...props}
                    color={'orange'}
                />
            </mesh>
        </>
    )
}

Fireworks.propTypes = {
    position: PropTypes.array.isRequired,
};

export default Fireworks;

