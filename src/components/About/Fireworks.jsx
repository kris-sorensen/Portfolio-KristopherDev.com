import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Points, Point, PointMaterial } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import PropTypes from 'prop-types';
import { useThree } from '@react-three/fiber';
import useStore from '../../hooks/useStore'


/* TODO:
 * Different colors of fireworks 
//  * fireworks spawn at mouse location
//  * add gravity
//  * add opacity--
 * dismount object when opacity hits zero (either pass a function and dismount or setup array in bear state library*this would be the best way)
//  * add Randomness to movement of points
 * firework flashes white before turning color
 * add click me button text that only shows itself after the 3 fireworks have had there go
*/


const Fireworks = () => {


    const { power, gravity, particleSize, count, friction, opacity } = useStore()
    // const addExpendedFirework = useStore((state) => state.addExpendedFirework)

    const { mouse, viewport } = useThree()
    const meshRef = useRef()
    const matRef = useRef()

    const stopEverything = useRef(false)

    useEffect(() => {
        const dismountInterval = setInterval(() => {
            console.log(`interval`);
            if (!runFrame.current && !stopEverything.current) {
                console.log('add expend')
                // addExpendedFirework()
                stopEverything.current = true
                clearInterval(dismountInterval);
            }
        }, 1000);
        return () => {
            clearInterval(dismountInterval);
        };
    }, []);

    const positions = Array.from({ length: count }, (i) => [
        // Get Spot of Mouse Click
        (mouse.x * viewport.width) / 2,
        (mouse.y * viewport.height) / 2,
        0
    ])

    // Create an array of random Velocities
    const velocities = Array.from({ length: count }, (i) => [Math.random() * power])
    //todo: add to useStore
    const angleIncrement = (Math.PI * 2) / count

    let runFrame = useRef(true)

    useFrame(() => {
        if (!stopEverything.current) {
            if (matRef.current.opacity <= 0 && meshRef.current.visible) {
                runFrame.current = false
                matRef.current.opacity = 0
                meshRef.current.visible = false
            }
            else if (runFrame.current) {

                matRef.current.opacity -= opacity
                // Move Points
                for (let i = 0; i < count; i++) {
                    //Add friction to slowdown fireworks over time
                    velocities[i] = velocities[i] * friction

                    const point = meshRef.current.children[0].children[i]
                    //Move x and y of points
                    point.position.x += ((Math.cos(angleIncrement * i)) * .01) * velocities[i]
                    point.position.y += ((Math.sin(angleIncrement * i)) * .01) * velocities[i] - gravity
                }
            }
        }



    })




    return (
        <>
            <mesh ref={meshRef}>
                <Points >
                    <PointMaterial blending={2} ref={matRef} vertexColors transparent size={particleSize} />
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
                <Point {...props} />
            </mesh>
        </>
    )
}

// Fireworks.propTypes = {
//     gravity: PropTypes.number.isRequired,
//     opacity: PropTypes.number.isRequired,
//     count: PropTypes.number.isRequired,
//     friction: PropTypes.number.isRequired,
//     particleSize: PropTypes.number.isRequired,
// };

export default Fireworks;

