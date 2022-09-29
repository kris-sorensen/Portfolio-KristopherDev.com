import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useFrame, extend } from '@react-three/fiber';
import PropTypes from 'prop-types';
import { useThree } from '@react-three/fiber';
import useFireworksStore from '../../stores/useFireworksStore'
import FireworkMaterial from '../../shaders/firework.js'
import createFireworkAttributes from './util/createFireworkAttributes'

extend({ FireworkMaterial });

const Fireworks = ({ explodeHere }) => {
    // * hooks
    const { gl, clock } = useThree()
    const { gravity, particleSize, particleCount, friction } = useFireworksStore()
    const [angleIncrement] = useState((Math.PI * 2) / particleCount);
    const points = useRef()

    // * clock
    let clockOffset = 0
    useEffect(() => {
        //used to offset clock so it starts at zero for each new firework
        clockOffset = clock.getElapsedTime()
    }, []);

    // * create firework attributes
    const { colors, positions, velocities, index } = createFireworkAttributes(explodeHere)

    // * animation loop
    useFrame(() => {
        points.current.material.uniforms.uTime.value = clock.getElapsedTime() - clockOffset;
    }, -3)

    return (
        <>
            <mesh>
                <points ref={points}>
                    <bufferGeometry attach="geometry">
                        <bufferAttribute
                            attach="attributes-position"
                            count={positions.length / 3}
                            array={positions}
                            itemSize={3}
                            usage={THREE.DynamicDrawUsage}
                        />
                        <bufferAttribute
                            attach="attributes-color"
                            count={colors.length / 3}
                            array={colors}
                            itemSize={3}
                            usage={THREE.DynamicDrawUsage}
                        />
                        <bufferAttribute
                            attach="attributes-aVelocities"
                            count={velocities.length}
                            array={velocities}
                            itemSize={1}
                            usage={THREE.DynamicDrawUsage}
                        />
                        <bufferAttribute
                            attach="attributes-aIndex"
                            count={index.length}
                            array={index}
                            itemSize={1}
                            usage={THREE.DynamicDrawUsage}
                        />
                    </bufferGeometry>
                    <fireworkMaterial vertexColors transparent uSize={particleSize * gl.getPixelRatio()} uAngleIncrement={angleIncrement} uFriction={friction} uGravity={gravity} />
                </points>
            </mesh>
        </>
    );
};

// * Types
Fireworks.propTypes = {
    explodeHere: PropTypes.any,
};


export default React.memo(Fireworks);