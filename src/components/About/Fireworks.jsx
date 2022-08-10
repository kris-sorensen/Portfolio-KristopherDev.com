import React, { useRef } from 'react';
import * as THREE from 'three';
import { Points, Point, PointMaterial } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import PropTypes from 'prop-types';
import { useThree } from '@react-three/fiber';


/* TODO:
 * Different colors of fireworks 
 * fireworks spawn at mouse location
 * add gravity
 * add opacity--
 * dismount object when opacity hits zero
 * add Randomness to movement of points
 * firework flashes white before turning color
*/


const Fireworks = ({ gravity, opacity, velocity, count }) => {
    const { mouse, viewport } = useThree()
    const meshRef = useRef()
    const matRef = useRef()
    const point = useRef()

    const positions = Array.from({ length: count }, (i) => [
        // THREE.MathUtils.randFloatSpread(0) + mouse.x,
        // THREE.MathUtils.randFloatSpread(0) + mouse.y,
        // 0,

        // Get Spot of Mouse Click
        (mouse.x * viewport.width) / 2,
        (mouse.y * viewport.height) / 2,
        0
    ])


    const velocities = Array.from({ length: count }, (i) => [
        Math.random() * velocity
    ])


    const angleIncrement = (Math.PI * 2) / count
    useFrame(() => {
        // console.log(mouse)
        // if (meshRef.current.children[0].children[0].material.opacity < 0) {

        // }
        // console.log('point ref', meshRef.current)
        for (let i = 0; i < count; i++) {
            // console.log(meshRef.current.children[0].children[i])
            const point = meshRef.current.children[0].children[i]
            point.position.x += ((Math.cos(angleIncrement * i)) * .01) * velocities[i]
            point.position.y += ((Math.sin(angleIncrement * i)) * .01) * velocities[i] - gravity


            // if (point.material.opacity > 0) point.material.opacity -= opacity
            // todo: might have to set opacity/ might be better to do outside of for loop and effect the whole mesh 

        }
    })


    return (
        <>
            <mesh ref={meshRef}>
                <Points>
                    <PointMaterial ref={matRef} vertexColors transparent size={3} />
                    {positions.map((position, i) => (
                        <PointEvent key={i} color={'blue'} position={position} />
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
                <Point velocity={Math.random()}
                    {...props}
                />
            </mesh>
        </>
    )
}

Fireworks.propTypes = {
    gravity: PropTypes.number.isRequired,
    velocity: PropTypes.number.isRequired,
    opacity: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
};

export default Fireworks;

