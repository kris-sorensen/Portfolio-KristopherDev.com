import React from 'react';
import * as THREE from 'three'
import PropTypes from 'prop-types';

// Creates a semi-transparent Layer over camera that creates a trail effect when renderer/gl is set to: autoClearColor: false, and preserveDrawingBuffer: true
const SemiTransparentLayer = ({ opacity }) => {
    return (
        <mesh position={[0, 0, -.1]} >
            <planeGeometry args={[60, 60, 1, 1]} />
            <meshBasicMaterial color='#000000' transparent={true} opacity={opacity} />
        </mesh>
    )
}


SemiTransparentLayer.propTypes = {
    opacity: PropTypes.number.isRequired,
};

export default SemiTransparentLayer